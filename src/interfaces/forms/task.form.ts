import { object, string } from "yup";

const body = {
  title: string().required("title is required."),
  content: string().required("content is required."),
};

const params = {
  id: string().required("id is required"),
};

export const CreateTaskForm = object({
  body: object({ ...body }),
});

export const UpdateTaskForm = object({
  params: object({ ...params }),
  body: object({ ...body }),
});

export const GetTaskForm = object({
  params: object({ ...params }),
});

export const DeleteTaskForm = object({
  params: object({ ...params }),
});
