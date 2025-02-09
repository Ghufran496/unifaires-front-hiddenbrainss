import { LoadingOutlined } from "@ant-design/icons";

export function PrimaryLoader() {
  return (
    <>
      <LoadingOutlined
        className="border-green-900 text-lg text-primary-800"
        style={{
          color: "#fff",
          borderColor: "blue",
        }}
      />
    </>
  );
}

export function WhiteLoader() {
  return (
    <LoadingOutlined
      className="border-white text-lg text-white"
      style={{
        color: "#fff",
        borderColor: "white",
      }}
    />
  );
}

export function GreenLoader() {
  return (
    <LoadingOutlined
      className="border-green-600 text-lg text-green-600"
      style={{
        color: "#166534",
        borderColor: "#166534",
      }}
    />
  );
}

export function PurpleLoader() {
  return (
    <LoadingOutlined
      className="border-purple-900 text-lg text-primary-800"
      style={{
        color: "#140342",
        borderColor: "blue",
      }}
    />
  );
}
