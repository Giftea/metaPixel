import Script from "next/script";

export default function Loading() {
  return (
    <div className="flex flex-col items-center">
      <Script src="https://cdn.lordicon.com/xdjxvujz.js"></Script>
      <lord-icon
        src="https://cdn.lordicon.com/xjovhxra.json"
        trigger="loop"
        colors="primary:#121331,secondary:#047857"
        style={{ width: "96px", height: "96px" }}
      ></lord-icon>
      <p className="text-lg text-emerald-800 font-cursive">
        Connecting the dots...
      </p>
    </div>
  );
}
