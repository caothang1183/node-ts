import { object, string, number } from "yup";

const body = {
  id: number().required("id is required."),
  name: string().required("name is required."),
  description: string().required("description is required."),
};

const params = {
  id: string().required("id is required"),
};

export const CreateRoleForm = object({
  body: object({ ...body }),
});

export const UpdateRoleForm = object({
  params: object({ ...params }),
  body: object({ ...body }),
});

export const GetRoleForm = object({
  params: object({ ...params }),
});

export const DeleteRoleForm = object({
  params: object({ ...params }),
});
