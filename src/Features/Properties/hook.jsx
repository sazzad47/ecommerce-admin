import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import {
  createProperty,
  getAllProperties,
  updateProperty,
  deleteProperty,
  updatePropertyValue,
  deletePropertyValue,
  addPropertyValue,
} from "./requests";
import { toast } from "react-hot-toast";

export const useAddProp = () => {
  const {
    isLoading: PropAddLoading,
    isSuccess: PropAddSuccess,
    mutate: PropAdd,
    isError: PropAddError,
    error,
  } = useMutation(createProperty);

  useEffect(() => {
    if (PropAddSuccess) {
      toast.success("Property added succefully");
    }
    if (PropAddError) {
      if (
        error?.response.data.type &&
        error?.response.data.type == "UniqueConstraintError"
      ) {
        toast.error("This property is already exist");
        return;
      }
      toast.error("An error happend");
    }
  }, [PropAddLoading, PropAddSuccess, PropAddError]);

  return {
    PropAddLoading,
    PropAdd,
    PropAddSuccess,
  };
};

export const useProps = () => {
  const {
    isLoading: PropsLoading,
    isSuccess: PropsSuccess,
    refetch: GetProps,
    data: PropsData,
  } = useQuery(["props"], () => getAllProperties(), {
    cacheTime: 0,
    enabled: false,
  });

  return {
    PropsLoading,
    PropsSuccess,
    GetProps,
    PropsData,
  };
};

export const usePropsOperations = (id) => {
  const { GetProps } = useProps();

  // Update property
  const {
    isLoading: UpdateLoading,
    isSuccess: UpdateSuccess,
    mutate: Update,
    isError: UpdateError,
    error,
  } = useMutation(updateProperty);

  // Update effects
  useEffect(() => {
    if (UpdateSuccess) {
      toast.success("Property updated succefully");
      GetProps();
    }
    if (UpdateError) {
      toast.error(error?.response.data.msg || "Error");
    }
  }, [UpdateLoading, UpdateSuccess, UpdateError]);

  // Delete property
  const {
    isLoading: DeleteLoading,
    isSuccess: DeleteSuccess,
    isError: DeleteError,
    refetch: Delete,
    error: DeleteMessage,
  } = useQuery(["props_delete", id], () => deleteProperty(id), {
    cacheTime: 0,
    enabled: false,
  });

  // Delete effects
  useEffect(() => {
    if (DeleteSuccess) {
      toast.success("Deleted Succefully");
      GetProps(); // re-fetch the products after deletion
    }
    if (DeleteError) {
      if (DeleteMessage?.response.data.type == "ForeignKeyConstraintError") {
        console.log("here");
        toast.error(
          "Cannot remove this property as it's used in other entities"
        );
        return;
      }
      toast.error(DeleteMessage?.response.data.msg);
    }
  }, [DeleteLoading, DeleteSuccess, DeleteError]);

  return {
    UpdateLoading,
    UpdateSuccess,
    Update,
    UpdateError,

    DeleteLoading,
    DeleteSuccess,
    DeleteError,
    Delete,
  };
};

export const usePropsValuesOperations = (id) => {
  const { GetProps } = useProps();

  // Update property
  const {
    isLoading: UpdateLoading,
    isSuccess: UpdateSuccess,
    mutate: Update,
    isError: UpdateError,
    error,
  } = useMutation(updatePropertyValue);

  // Update effects
  useEffect(() => {
    if (UpdateSuccess) {
      toast.success("value updated succefully");
    }
    if (UpdateError) {
      toast.error(error?.response.data.msg || "Error");
    }
  }, [UpdateLoading, UpdateSuccess, UpdateError]);

  // Delete property
  const {
    isLoading: DeleteLoading,
    isSuccess: DeleteSuccess,
    isError: DeleteError,
    refetch: Delete,
    error: DeleteMessage,
  } = useQuery(["value_delete", id], () => deletePropertyValue(id), {
    cacheTime: 0,
    enabled: false,
  });

  // Delete effects
  useEffect(() => {
    if (DeleteSuccess) {
      toast.success("Deleted Succefully");
      GetProps();
    }
    if (DeleteError) {
      if (DeleteMessage?.response.data.type == "ForeignKeyConstraintError") {
        console.log("here");
        toast.error("Cannot remove this value as it's used in other entities");
        return;
      }
      toast.error(DeleteMessage?.response.data.msg);
    }
  }, [DeleteLoading, DeleteSuccess, DeleteError]);

  return {
    UpdateLoading,
    UpdateSuccess,
    Update,
    UpdateError,

    DeleteLoading,
    DeleteSuccess,
    DeleteError,
    Delete,
  };
};

export const useAddValue = (afterAdding) => {
  const { GetProps } = useProps();

  const {
    isLoading: valueAddLoading,
    isSuccess: valueAddSuccess,
    mutate: valueAdd,
    isError: valueAddError,
    error,
  } = useMutation(addPropertyValue);

  useEffect(() => {
    if (valueAddSuccess) {
      toast.success("Values added succefully");
      GetProps().then((p) => {
        afterAdding();
      });
    }
    if (valueAddError) {
      toast.error(error?.response.data.msg);
    }
  }, [valueAddLoading, valueAddSuccess, valueAddError]);

  const preAdding = (values, id) => {
    const arrayOfValues = values.split("+");
    valueAdd({
      id,
      values: [...arrayOfValues],
    });
  };

  return {
    valueAddLoading,
    preAdding,
    valueAddSuccess,
  };
};
