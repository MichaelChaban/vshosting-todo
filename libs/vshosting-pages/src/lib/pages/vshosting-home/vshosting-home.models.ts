import { ColumnDefinition, Todo } from "@vshosting-todo/shared";

export function getColumnDefinitions(defs: {
  onEdit: (row: Todo) => void;
  onDelete: (row: Todo) => void;
}): ColumnDefinition<Todo>[] {
  return [
    {
      id: "id",
      headerName: "ID",
      value: "id",
      sortable: true,
    },
    {
      id: "text",
      headerName: "Text",
      value: "text",
      sortable: true,
    },
    {
      id: "completed",
      headerName: "Completed",
      value: (todo) => (todo?.completed ? "Yes" : "No"),
      sortable: true,
    },
    {
      id: "actions",
      columnActions: [
        {
          title: "Edit",
          color: "primary",
          className: "bg-blue-500 text-white",
          rounded: true,
          onClick: defs.onEdit,
        },
        {
          title: "Delete",
          color: "warn",
          className: "bg-red-500 text-white",
          rounded: true,
          tooltip: "Delete",
          onClick: defs.onDelete,
        },
      ],
    },
  ];
}
