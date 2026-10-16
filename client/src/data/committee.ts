/*
 * The Stó:lō Education Committee. To add a portrait, put the image in R2
 * (bucket salmon-tool, folder committee/) and paste its public URL into `photo`.
 * Leave `photo` empty to show the initial monogram. Members who share the same photo URL
 * (a photo of them together) are shown as one card captioned with both names, in the
 * order they stand in the photo, left to right: Karla Kay, then Dianna Kay.
 */
export const R2_BASE = "https://pub-0317bbc29b454318b7d27ef0bb324c99.r2.dev";

export const COMMITTEE: { name: string; role: string; photo: string }[] = [
  { name: "Kweláxtelot (Karla) Kay", role: "Language Vitalist", photo: `${R2_BASE}/committee/dianna-and-karla-kay.jpg` },
  { name: "Siyámíya (Dianna) Kay", role: "Language Curriculum Developer", photo: `${R2_BASE}/committee/dianna-and-karla-kay.jpg` },
  { name: "Saylesh Wesley", role: "First Nations Resource Enhancement Teacher", photo: "" },
  { name: "Camielle Laslo", role: "Halq'eméylem Teacher", photo: "" },
];
