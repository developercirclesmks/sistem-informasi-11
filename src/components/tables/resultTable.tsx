import { Box } from "@mui/material";
import {
	MRT_ColumnDef,
	MaterialReactTable,
	useMaterialReactTable,
} from "material-react-table";

import { IExamResult } from "../../interfaces/result";

interface ResultTableProps {
	data: IExamResult[];
}

export const ResultTable: React.FC<ResultTableProps> = ({ data }) => {
	const table = useMaterialReactTable({
		columns,
		data,
		enableEditing: true,
		enableRowActions: false,
		rowNumberDisplayMode: "original",
		enableRowNumbers: true,
		enableRowSelection: false,
		positionActionsColumn: "last",
		muiTablePaperProps: {
			elevation: 0,
		},

		enableFullScreenToggle: false,
		enableStickyFooter: true,
	});

	return <MaterialReactTable table={table} />;
};

const columns: MRT_ColumnDef<IExamResult>[] = [
	{
		accessorKey: "user.firstName",
		header: "User",
		accessorFn: (row) => {
			return `${row.user.firstName} ${row.user.lastName}`;
		},
	},
	{
		accessorKey: "score",
		header: "Score",
		accessorFn: (row) => parseFloat(row.score.toString()).toFixed(2),
	},
];
