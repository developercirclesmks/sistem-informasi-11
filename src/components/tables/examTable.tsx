import { Box } from "@mui/material";
import {
	MRT_ColumnDef,
	MaterialReactTable,
	useMaterialReactTable,
} from "material-react-table";

import { IExam } from "../../interfaces/exam";
import { trashOutline, createOutline } from "ionicons/icons";
import {
	IonButton,
	IonCard,
	IonCol,
	IonIcon,
	IonItem,
	IonRouterLink,
	IonText,
} from "@ionic/react";
import { formatDate, formatToHour } from "../../formatter/formatter";
import { useHistory } from "react-router";
import { deleteExam } from "../../services/examService";
import { showToast } from "../atoms/Toasts/Toasts";
import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

interface ExamTableProps {
	data: IExam[];
	handleStartExam: (id: string) => void;
}

export const ExamTable: React.FC<ExamTableProps> = ({
	data,
	handleStartExam,
}) => {
	const history = useHistory();
	const handleDelete = async (id: string) => {
		try {
			const examToDelete = data.find((exam) => exam.id === id);
			if (
				examToDelete?.endedAt &&
				examToDelete?.startedAt &&
				Timestamp.now().toMillis() < examToDelete.endedAt.toMillis() &&
				Timestamp.now().toMillis() > examToDelete.startedAt.toMillis()
			) {
				showToast("error", "Cannot delete an ongoing exam", 1000);
				return false;
			}
			await deleteExam(id);
			showToast("success", "Exam Deleted");
			window.location.reload();
			return true;
		} catch (error) {
			showToast("error", "Failed to delete exam", 1000);
			return false;
		}
	};
	const table = useMaterialReactTable({
		columns,
		data,
		initialState: {
			sorting: [
				{
					id: "createdAt",
					desc: false,
				},
			],
		},
		enableEditing: true,
		enableRowActions: true,
		rowNumberDisplayMode: "static",
		enableRowNumbers: true,
		enableRowSelection: false,
		positionActionsColumn: "last",
		muiTablePaperProps: {
			elevation: 0,
		},

		enableFullScreenToggle: false,
		enableStickyFooter: true,

		renderRowActions: ({ row }) => {
			const now = Timestamp.now().toMillis();
			const startedAt = row.original.startedAt
				? row.original.startedAt.toMillis()
				: null;
			const endedAt = row.original.endedAt
				? row.original.endedAt.toMillis()
				: null;

			const isBetweenStartAndEnd =
				startedAt && endedAt && now >= startedAt && now <= endedAt;

			const hasExamStarted = startedAt && now >= startedAt;

			return (
				<Box
					display="flex"
					flexWrap="nowrap"
					alignItems="center"
					flexShrink={0}
				>
					{!startedAt ||
					(startedAt && Timestamp.now().toMillis() < startedAt) ? (
						<IonButton
							title="Edit"
							shape="round"
							fill="clear"
							size="large"
							className="iconBtn noMargin noPadding"
							color="primary"
							onClick={() => history.push(`exam/${row.original.id}/edit`)}
						>
							<IonText className="noMargin noPadding">
								<IonIcon icon={createOutline} />
							</IonText>
						</IonButton>
					) : null}

					<IonRouterLink href={`/exam/${row.original.id}/overview`}>
						<IonButton
							title="View Result"
							shape="round"
							fill="clear"
							color="warning"
							size="large"
							className="iconBtn noMargin noPadding"
						>
							<IonText className="noMargin noPadding">
								<IonIcon src="/icon/dashboard.svg" />
							</IonText>
						</IonButton>
					</IonRouterLink>
					<IonButton
						title="Delete"
						shape="round"
						fill="clear"
						size="large"
						className="iconBtn noMargin noPadding"
						color="danger"
						onClick={() => handleDelete(row.original.id)}
					>
						<IonText className="noMargin noPadding">
							<IonIcon icon={trashOutline} />
						</IonText>
					</IonButton>
					{!hasExamStarted ? (
						<IonButton
							fill="clear"
							size="small"
							onClick={() => handleStartExam(row.original.id)}
						>
							Start
						</IonButton>
					) : null}
				</Box>
			);
		},
	});

	return <MaterialReactTable table={table} />;
};

const columns: MRT_ColumnDef<IExam>[] = [
	{
		accessorKey: "id",
		header: "Exam ID",
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
		accessorFn: (row) =>
			!!row.createdAt
				? `${formatDate(row.createdAt.toString(), "full")} at ${formatToHour(
						row.createdAt.toString()
				  )} UTC+8`
				: "-",
	},
	{
		accessorKey: "startedAt",
		header: "Started At",
		accessorFn: (row) => {
			if (row.startedAt !== null) {
				const date = row.startedAt.toDate();
				const formattedDate = new Intl.DateTimeFormat("en-US", {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric",
					hour: "numeric",
					minute: "numeric",
					second: "numeric",
					hour12: false,
				}).format(date);
				return `${formattedDate} UTC+8`;
			} else {
				return "Started Manually";
			}
		},
	},
	{
		accessorKey: "totalDuration",
		header: "Duration (minute)",
	},
	{
		accessorKey: "endedAt",
		header: "End At",
		accessorFn: (row) => {
			if (row.endedAt !== null) {
				const date = row.endedAt.toDate();
				const formattedDate = new Intl.DateTimeFormat("en-US", {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric",
					hour: "numeric",
					minute: "numeric",
					second: "numeric",
					hour12: false,
				}).format(date);
				return `${formattedDate} UTC+8`;
			} else {
				return "-";
			}
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		accessorFn: (row) => {
			const now = Timestamp.now().toMillis();
			const startedAt = row.startedAt ? row.startedAt.toMillis() : null;
			const endedAt = row.endedAt ? row.endedAt.toMillis() : null;

			if (startedAt === null) {
				return (
					<IonCard className="statusTable" color={"warning"}>
						Waiting
					</IonCard>
				);
			} else if (now < startedAt) {
				return (
					<IonCard className="statusTable" color={"warning"}>
						Waiting
					</IonCard>
				);
			} else if (endedAt && now > endedAt) {
				return (
					<IonCard className="statusTable" color={"danger"}>
						Ended
					</IonCard>
				);
			} else {
				return (
					<IonCard className="statusTable" color={"success"}>
						On Going
					</IonCard>
				);
			}
		},
	},
];
