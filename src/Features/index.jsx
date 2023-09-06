import {
  useAddProp,
  useProps,
  usePropsOperations,
  usePropsValuesOperations,
  useAddValue,
} from "./Properties/hook";
import {
  useAddCategory,
  useCategory,
  useCategoryOperations,
  useCategoryProperties,
  useCategoryImages,
} from "./Categoies/hook";
import {
  useAddProduct,
  useProduct,
  useSearchProducts,
  useUpdateProduct,
  useGetImPr,
  useDeleteImage,
  useDeleteProp,
} from "./Product/hook";
import { useCustomers } from "./Customers/hook";
import { useOrders, useOrdersItems } from "./Order/hook";
import {
  useDash,
  useSlidersImages,
  useSlidersImagesOperation,
  usePages,
} from "./Dash/hooks";
import { useLogin, useAdminDetails } from "./Admin/hooks";

// Hooks

export const PropHooks = {
  useAddProp,
  useProps,
  usePropsOperations,
  usePropsValuesOperations,
  useAddValue,
};

export const CategoryHooks = {
  useAddCategory,
  useCategory,
  useCategoryOperations,
  useCategoryProperties,
  useCategoryImages,
};

export const ProductHooks = {
  useAddProduct,
  useProduct,
  useSearchProducts,
  useUpdateProduct,
  useGetImPr,
  useDeleteImage,
  useDeleteProp,
};

export const CustomersHooks = {
  useCustomers,
};

export const OrdersHooks = {
  useOrders,
  useOrdersItems,
};

export const DashHooks = {
  useDash,
  useSlidersImages,
  useSlidersImagesOperation,
  usePages,
};

export const AdminHooks = {
  useLogin,
  useAdminDetails,
};
