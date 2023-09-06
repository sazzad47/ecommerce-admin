import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  createProduct,
  getAlProducts,
  deleteProduct,
  SearchProductsByName,
  getProduct,
  updateProduct,
  getProductImages,
  DeleteProductImage,
  AddProductImage,
  getProductProps,
  deleteProductProps,
  addProductProps,
} from "./requests";
import { toast } from "react-hot-toast";
import { objectToFormData } from "../../helpers/Methods";

// Hook for adding a product

export const useAddProduct = () => {
  const {
    isLoading: ProductAddLoading,
    isSuccess: ProductAddSuccess,
    mutate: ProductAdd,
    isError: ProductAddError,
    error,
  } = useMutation(createProduct);

  useEffect(() => {
    if (ProductAddSuccess) {
      toast.success("Product added succefully");
    }
    if (ProductAddError) {
      if (
        error?.response.data.type &&
        error?.response.data.type == "UniqueConstraintError"
      ) {
        toast.error("This category is already exist");
        return;
      }
      toast.error("An error happend");
    }
  }, [ProductAddLoading, ProductAddSuccess, ProductAddError]);

  const preAdding = (data) => {
    const formData = objectToFormData(data, ["product_images", "properties"]);
    for (let i = 0; i < data["product_images"].length; i++) {
      formData.append("product_images", data["product_images"][i]);
    }

    if (!data["properties"].length) {
      toast.error("You should add at least 1 property");
      return;
    }

    formData.append("properties", JSON.stringify(data["properties"]));
    ProductAdd(formData);
  };

  return {
    ProductAddLoading,
    ProductAddSuccess,
    preAdding,
  };
};

// General hook for getting and delete the product
export const useProduct = (id) => {
  // Getting all products
  const {
    isLoading: ProductsLoading,
    isSuccess: ProductsSuccess,
    refetch: GetProducts,
    data: ProductsData,
  } = useQuery(["Products"], () => getAlProducts(), {
    cacheTime: 0,
    enabled: false,
  });

  // Deleteing a product
  const {
    isLoading: DeleteLoading,
    isSuccess: DeleteSuccess,
    isError: DeleteError,
    refetch: Delete,
    error,
  } = useQuery(["delete_product", id], () => deleteProduct(id), {
    cacheTime: 0,
    enabled: false,
  });

  // Deletion side effects
  useEffect(() => {
    if (DeleteSuccess) {
      toast.success("Deleted Succefully");
      GetProducts(); // re-fetch the products after deletion
    }
    if (DeleteError) {
      if (error?.response.data.type == "ForeignKeyConstraintError") {
        toast.error(
          "Cannot remove this product as it's used in other entities"
        );
        return;
      }
      toast.error(error?.response.data.msg);
    }
  }, [DeleteLoading, DeleteSuccess, DeleteError]);

  // getting a product
  const {
    isLoading: GetLoading,
    isSuccess: GetSuccess,
    isError: GetError,
    data: GetData,
    refetch: Get,
  } = useQuery(["get_product", id], () => getProduct(id), {
    cacheTime: 0,
    enabled: false,
  });

  return {
    ProductsLoading,
    ProductsSuccess,
    GetProducts,
    ProductsData,

    DeleteLoading,
    DeleteSuccess,
    DeleteError,
    Delete,

    GetLoading,
    GetSuccess,
    GetError,
    Get,
    GetData,
  };
};

// Hook for products searching
export const useSearchProducts = () => {
  const [query, setQuery] = useState("");

  // seaarch for a product
  const {
    isLoading: SearchLoading,
    isSuccess: SearchSuccess,
    data: SearchData,
    isError: SearchError,
    refetch: Search,
  } = useQuery(["search_product", query], () => SearchProductsByName(query), {
    cacheTime: 0,
    enabled: false,
  });

  return {
    SearchLoading,
    SearchSuccess,
    SearchData,
    SearchError,
    Search,
    query,
    setQuery,
  };
};

// Hook for Updating a product
export const useUpdateProduct = () => {
  const {
    isLoading: UpdateLoading,
    isSuccess: UpdateSuccess,
    mutate: Update,
    isError: UpdateError,
    error,
  } = useMutation(updateProduct);

  const {
    isLoading: AddImageLoading,
    isSuccess: AddImageSuccess,
    mutateAsync: AddImage,
    isError: AddImageError,
  } = useMutation(AddProductImage);

  const {
    isLoading: AddPropLoading,
    isSuccess: AddPropSuccess,
    mutateAsync: AddProp,
    isError: AddPropError,
  } = useMutation(addProductProps);

  useEffect(() => {
    if (UpdateSuccess || AddImageSuccess || AddPropSuccess) {
      toast.success("Product updated succefully");
    }
    if (UpdateError || AddPropError) {
      toast.error(error?.response.data.msg);
    }
  }, [
    UpdateLoading,
    UpdateSuccess,
    AddImageSuccess,
    AddImageLoading,
    AddPropSuccess,
    AddPropLoading,
    UpdateError,
    AddPropError,
  ]);

  return {
    UpdateLoading,
    UpdateSuccess,
    Update,
    UpdateError,

    AddImageLoading,
    AddImageSuccess,
    AddImage,
    AddImageError,

    AddPropLoading,
    AddPropSuccess,
    AddProp,
  };
};

// Hook for getting Product images and Properties
export const useGetImPr = (id) => {
  const {
    isLoading: ImagesLoading,
    isSuccess: ImagesSuccess,
    data: ImagesData,
    refetch: Images,
  } = useQuery(["get_product_images", id], () => getProductImages(id));

  const {
    isLoading: PropsLoading,
    isSuccess: PropsSuccess,
    data: PropsData,
    refetch: Props,
  } = useQuery(["get_product_Props", id], () => getProductProps(id));

  return {
    ImagesLoading,
    ImagesSuccess,
    ImagesData,
    Images,

    PropsLoading,
    PropsSuccess,
    PropsData,
    Props,
  };
};

// Hook for delete Product images
export const useDeleteImage = (id, refetch_images) => {
  const {
    isLoading: DeleteLoading,
    isSuccess: DeleteSuccess,
    refetch: Delete,
    isError: DeleteError,
    error,
  } = useQuery(["delete_image", id], () => DeleteProductImage(id), {
    cacheTime: 0,
    enabled: false,
  });

  // Deletion side effects
  useEffect(() => {
    if (DeleteSuccess) {
      refetch_images();
    }
    if (DeleteError) {
      toast.error(error?.response.data.msg || "Error");
    }
  }, [DeleteLoading, DeleteSuccess, DeleteError]);

  return {
    DeleteLoading,
    DeleteSuccess,
    Delete,
    DeleteError,
  };
};

// Hook for delete Product images
export const useDeleteProp = (id, prop_id) => {
  const { Props } = useGetImPr(id);
  const {
    isLoading: DeleteLoading,
    isSuccess: DeleteSuccess,
    refetch: Delete,
    isError: DeleteError,
    error,
  } = useQuery(
    ["delete_image", id, prop_id],
    () => deleteProductProps({ id, prop_id }),
    {
      cacheTime: 0,
      enabled: false,
    }
  );

  // Deletion side effects
  useEffect(() => {
    if (DeleteSuccess) {
      Props();
    }
    if (DeleteError) {
      toast.error(error?.response.data.msg || "Error");
    }
  }, [DeleteLoading, DeleteSuccess, DeleteError]);

  return {
    DeleteLoading,
    DeleteSuccess,
    Delete,
    DeleteError,
  };
};
