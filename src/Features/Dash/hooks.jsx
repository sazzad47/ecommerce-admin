import { useMutation, useQuery } from "react-query";
import {
  getInitialData,
  addSlider,
  getSliders,
  deleteSlider,
  getPages,
  updatePage,
} from "./requests";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export const useDash = () => {
  const {
    isLoading: InitialLoading,
    isSuccess: InitialSuccess,
    refetch: GetInitial,
    data: InitialData,
  } = useQuery(["Initial"], () => getInitialData(), {
    cacheTime: 5000,
    enabled: false,
  });

  return {
    InitialLoading,
    InitialSuccess,
    GetInitial,
    InitialData,
  };
};

export const useSlidersImages = () => {
  const {
    isLoading: SlidersLoading,
    isSuccess: SlidersSuccess,
    refetch: GetSliders,
    data: SlidersData,
  } = useQuery(["sliders"], () => getSliders(), {
    cacheTime: 5000,
    enabled: false,
  });

  const {
    isLoading: SlidersAddLoading,
    isSuccess: SlidersAddSuccess,
    mutate: SlidersAdd,
    isError: SlidersAddError,
    error,
  } = useMutation(addSlider);

  useEffect(() => {
    if (SlidersAddSuccess) {
      toast.success("Sliders added succefully");
      GetSliders();
    }
    if (SlidersAddError) {
      toast.error(error?.response.data.msg);
    }
  }, [SlidersAddLoading, SlidersAddSuccess, SlidersAddError]);

  const preAdding = (values) => {
    const formData = new FormData();
    for (let i = 0; i < values.files.length; i++) {
      formData.append("sliders", values.files[i]);
    }
    SlidersAdd(formData);
  };

  return {
    SlidersLoading,
    SlidersSuccess,
    GetSliders,
    SlidersData,

    SlidersAddLoading,
    SlidersAddSuccess,
    SlidersAddError,
    preAdding,
  };
};

export const useSlidersImagesOperation = (id) => {
  const { GetSliders } = useSlidersImages();
  const {
    isLoading: DeleteLoading,
    isSuccess: DeleteSuccess,
    refetch: Delete,
    isError: DeleteError,
    error,
  } = useQuery(["sliderDelete", id], () => deleteSlider(id), {
    cacheTime: 5000,
    enabled: false,
  });

  useEffect(() => {
    if (DeleteSuccess) {
      toast.success("Sliders deleted succefully");
      GetSliders();
    }
    if (DeleteError) {
      toast.error(error?.response.data.msg);
    }
  }, [DeleteLoading, DeleteSuccess, DeleteError]);

  return {
    DeleteLoading,
    Delete,
  };
};

export const usePages = () => {
  const {
    isLoading: PagesLoading,
    isSuccess: PagesSuccess,
    refetch: GetPages,
    data: PagesData,
  } = useQuery(["pages"], () => getPages(), {
    cacheTime: 0,
    enabled: false,
  });

  const {
    isLoading: UpdateLoading,
    isSuccess: UpdateSuccess,
    mutate: Update,
    isError: UpdateError,
    error,
  } = useMutation(updatePage);

  useEffect(() => {
    if (UpdateSuccess) {
      toast.success("Updated succefully");
    }
    if (UpdateError) {
      toast.error(error?.response.data.msg);
    }
  }, [UpdateLoading, UpdateSuccess, UpdateError]);

  return {
    PagesLoading,
    PagesSuccess,
    GetPages,
    PagesData,
    Update,
    UpdateLoading,
  };
};
