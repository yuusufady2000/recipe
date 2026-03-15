import { useState, useEffect } from "react";

type LoaderProps = {
  type?: "TailSpin" | "Oval" | "Bars" | "Circles";
  color?: string;
  height?: number;
  width?: number;
  loading: boolean;
};

const ClientOnlyLoader = ({
  type = "TailSpin",
  color = "#36d7b7",
  height = 50,
  width = 50,
  loading,
}: LoaderProps) => {
  const [Spinner, setSpinner] = useState<any>(null);

  useEffect(() => {
    if (loading) {
      import("react-loader-spinner").then((mod) => {
        const SelectedSpinner = mod[type];
        setSpinner(() => SelectedSpinner);
      });
    }
  }, [type, loading]);

  if (!Spinner || !loading) return null;

  return <Spinner color={color} height={height} width={width} />;
};

export default ClientOnlyLoader;