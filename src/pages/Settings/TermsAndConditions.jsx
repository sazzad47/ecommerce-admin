import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formats, modules } from "../../constants";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { DashHooks } from "../../Features";
const TermsAndConditions = ({ val, id }) => {
  const { usePages } = DashHooks;
  const { Update, UpdateLoading } = usePages();
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(val);
  }, [val]);

  const handleClick = () => {
    Update({
      page: "terms",
      value,
      id,
    });
  };

  return (
    <div className="mb-3">
      <h2>Terms & Conditions</h2>
      <ReactQuill
        modules={modules}
        formats={formats}
        value={value}
        onChange={(val) => setValue(val)}
      />
      <Button
        loading={UpdateLoading}
        disabled={UpdateLoading}
        onClick={() => handleClick()}
        className="mt-3"
      >
        Save
      </Button>
    </div>
  );
};

export default TermsAndConditions;
