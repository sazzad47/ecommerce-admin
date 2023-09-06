import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  createCategory,
  getAllCategories,
  getAllCategoriesProperties,
  updateCategory,
  deleteCategory,
  getCategoryProperties,
  addCategoryProp,
  updateImage,
} from "./requests";
import { toast } from "react-hot-toast";
import { changeFileName } from "../../helpers/Methods";

export const useAddCategory = () => {
  const {
    isLoading: CategoryAddLoading,
    isSuccess: CategoryAddSuccess,
    mutate: CategoryAdd,
    isError: CategoryAddError,
    error,
  } = useMutation(createCategory);

  useEffect(() => {
    if (CategoryAddSuccess) {
      toast.success("Category added succefully");
    }
    if (CategoryAddError) {
      if (
        error?.response.data.type &&
        error?.response.data.type == "UniqueConstraintError"
      ) {
        toast.error("This category is already exist");
        return;
      }
      toast.error("An error happend");
    }
  }, [CategoryAddLoading, CategoryAddSuccess, CategoryAddError]);

  const preAdding = (data, props) => {
    const formData = new FormData();

    // by this way the server can differ in between the normal image and the banner image
    const icon = changeFileName(
      data["icon"][0],
      data["icon"][0].name + "_cat_image"
    );

    const banner = data["banner"][0];

    formData.append("title", data.title);
    formData.append("properties", props);
    let images = [icon, banner];
    images.forEach((value) => {
      formData.append("images", value);
    });
    CategoryAdd(formData);
  };

  return {
    CategoryAddLoading,
    CategoryAddSuccess,
    preAdding,
  };
};

export const useCategory = () => {
  const {
    isLoading: CategoryLoading,
    isSuccess: CategorySuccess,
    refetch: GetCategory,
    data: CategoryData,
  } = useQuery(["Category"], () => getAllCategories(), {
    cacheTime: 0,
    enabled: false,
  });

  const [id, setId] = useState(-1);
  const {
    isLoading: CatPropsLoading,
    isSuccess: CatPropsSuccess,
    refetch: GetCatProps,
    data: CatPropsData,
  } = useQuery(["Category_props", id], () => getAllCategoriesProperties(id), {
    cacheTime: 0,
    enabled: false,
  });

  useEffect(() => {
    if (id > 0) {
      GetCatProps();
    }
  }, [id]);

  return {
    CategoryLoading,
    CategorySuccess,
    GetCategory,
    CategoryData,
    setId,

    CatPropsLoading,
    CatPropsSuccess,
    CatPropsData,
    id,
  };
};

export const useCategoryOperations = (id) => {
  const { GetCategory } = useCategory();

  // Update property
  const {
    isLoading: UpdateLoading,
    isSuccess: UpdateSuccess,
    mutate: Update,
    isError: UpdateError,
    error,
  } = useMutation(updateCategory);

  // Update effects
  useEffect(() => {
    if (UpdateSuccess) {
      toast.success("category updated succefully");
      GetCategory();
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
  } = useQuery(["category_delete", id], () => deleteCategory(id), {
    cacheTime: 0,
    enabled: false,
  });

  // Delete effects
  useEffect(() => {
    if (DeleteSuccess) {
      toast.success("Deleted Succefully");
      GetCategory(); // re-fetch the products after deletion
    }
    if (DeleteError) {
      if (DeleteMessage?.response.data.type == "ForeignKeyConstraintError") {
        console.log("here");
        toast.error(
          "Cannot remove this category as it's used in other entities"
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

export const useCategoryProperties = (id) => {
  const {
    isLoading: GetLoading,
    isSuccess: GetSuccess,
    data: GetData,
    refetch: Get,
  } = useQuery(
    ["props_category_operations", id],
    () => getCategoryProperties(id),
    {
      cacheTime: 0,
      enabled: false,
    }
  );

  // Update property
  const {
    isLoading: AddLoading,
    isSuccess: AddSuccess,
    mutateAsync: Add,
    isError: AddError,
    error,
  } = useMutation(addCategoryProp);

  // Add effects
  useEffect(() => {
    if (AddSuccess) {
      toast.success("property Addd succefully");
    }
    if (AddError) {
      toast.error(error?.response.data.msg || "Error");
    }
  }, [AddLoading, AddSuccess, AddError]);

  const preAdding = async (id, prop_id, checked) => {
    if (checked) {
      await Add({
        id,
        prop_id,
      });
    }
  };

  return {
    GetLoading,
    GetSuccess,
    GetData,
    Get,

    preAdding,
    AddLoading,
    AddSuccess,
  };
};

export const useCategoryImages = () => {
  // Update image
  const {
    isLoading: UpdateLoading,
    isSuccess: UpdateSuccess,
    mutateAsync: Update,
    isError: UpdateError,
    error,
  } = useMutation(updateImage);

  // Update effects
  useEffect(() => {
    if (UpdateSuccess) {
      toast.success("image Updated succefully");
    }
    if (UpdateError) {
      toast.error(error?.response.data.msg || "Error");
    }
  }, [UpdateLoading, UpdateSuccess, UpdateError]);

  const preUpdate = async (id, attribute, file) => {
    const formData = new FormData();
    formData.append("attribute", attribute);
    formData.append("id", id);
    formData.append("image", file);
    Update(formData);
  };

  return {
    preUpdate,
    UpdateLoading,
    UpdateSuccess,
  };
};
