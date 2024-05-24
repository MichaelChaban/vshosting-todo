import {
  ColumnDefinition,
  FilterDefinition,
  Todo,
} from "@vshosting-todo/shared";

export function getColumnDefinitions(defs: {
  onEdit: (row: Todo) => void;
  onDelete: (row: Todo) => void;
  markAllAsCompleted: () => void;
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
      headerActions: [
        {
          title: "Mark All As Completed",
          color: "primary",
          onClick: defs.markAllAsCompleted,
        },
      ],
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

export function getFilterDefinitions(): FilterDefinition<Todo>[] {
  return [
    { id: "id", label: "ID", type: "text", placeholder: "Filter by ID" },
    {
      id: "text",
      label: "Text",
      type: "text",
      placeholder: "Text",
    },
    {
      id: "completed",
      label: "Completed",
      type: "select",
      placeholder: "Completed",
      options: [
        { value: "true", label: "Completed" },
        { value: "false", label: "Not Completed" },
      ],
    },
  ];
}
