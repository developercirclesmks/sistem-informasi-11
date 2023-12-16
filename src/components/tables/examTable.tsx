import { Box } from "@mui/material";
import {
	MRT_ColumnDef,
	MaterialReactTable,
	useMaterialReactTable,
} from "material-react-table";

import { IExam } from "../../interfaces/exam";
import { trashOutline, createOutline } from "ionicons/icons";
import { IonButton, IonIcon, IonRouterLink, IonText } from "@ionic/react";
import { formatDate, formatToHour } from "../../formatter/formatter";
import { useHistory } from "react-router";
import { deleteExam } from "../../services/examService";
import { showToast } from "../atoms/Toasts/Toasts";
import { Link } from "react-router-dom";

interface ExamTableProps {
	data: IExam[];
}

export const ExamTable: React.FC<ExamTableProps> = ({ data }) => {
	const history = useHistory();
	const handleDelete = async (id: string) => {
		try {
			await deleteExam(id);
			showToast("success", "Exam Deleted");
		} catch (error) {
			showToast("error", "Failed to delete exam", 1000);
		}
	};
	const table = useMaterialReactTable({
		columns,
		data,
		enableEditing: true,
		enableRowActions: true,
		rowNumberDisplayMode: "original",
		enableRowNumbers: true,
		enableRowSelection: false,
		positionActionsColumn: "last",
		muiTablePaperProps: {
			elevation: 0,
		},

		enableFullScreenToggle: false,
		enableStickyFooter: true,

		renderRowActions: ({ row }) => (
			<Box display="flex" flexWrap="nowrap" alignItems="center" flexShrink={0}>
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
				<IonRouterLink href={`/exam/${row.original.id}/overview`}>
					<IonButton
						title="Edit"
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
			</Box>
		),
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
];
