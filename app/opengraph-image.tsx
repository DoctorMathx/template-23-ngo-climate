import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";
import { impactStats } from "@/mock/impact";

export const alt = `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FOREST = "#0C2A1E";
const LIME = "#C6F432";
const MIST = "#EEF3EC";

export default async function Image() {
  const trees = impactStats.find((s) => s.id === "trees")!.value.toLocaleString("en-NG");
  const rings = Array.from({ length: 9 });
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: FOREST, position: "relative", fontFamily: "sans-serif", overflow: "hidden" }}>
        {rings.map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              right: -260 - i * 60,
              top: -200 - i * 50,
              width: 520 + i * 120,
              height: 420 + i * 100,
              borderRadius: "50%",
              border: `1.5px solid rgba(198,244,50,${0.28 - i * 0.025})`,
              display: "flex",
            }}
          />
        ))}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px 80px", flex: 1, position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: 999, background: LIME, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 22, height: 30, background: FOREST, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", display: "flex" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: -0.5 }}>Green Canopy</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: LIME, letterSpacing: 6 }}>TRUST</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 78, fontWeight: 700, lineHeight: 1.0, letterSpacing: -3, color: "#fff" }}>
              <span>Regrow the land.</span>
              <span style={{ color: LIME }}>Measure every tree.</span>
            </div>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <span style={{ padding: "10px 22px", borderRadius: 999, background: LIME, color: FOREST, fontSize: 24, fontWeight: 700 }}>{trees} trees planted</span>
              <span style={{ padding: "10px 22px", borderRadius: 999, border: `1.5px solid rgba(238,243,236,.35)`, color: MIST, fontSize: 22 }}>Sahel · Niger Delta · Lagos</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, color: "rgba(238,243,236,.6)", letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>
            <span>{siteConfig.brand.domain}</span>
            <span>Built on FinStore</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
