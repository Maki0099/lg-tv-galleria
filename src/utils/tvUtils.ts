
export const groupTvsByCategories = (tvs: any[]) => {
  return tvs.reduce((acc, tv) => {
    if (!acc[tv.series]) {
      acc[tv.series] = [];
    }
    acc[tv.series].push(tv);
    return acc;
  }, {} as Record<string, any[]>);
};

export const getTechnologyDescription = (series: string) => {
  switch (series) {
    case "OLED":
      return "Nejvyšší kvalita obrazu s dokonalou černou a nekonečným kontrastem. Každý pixel svítí samostatně.";
    case "QNED":
      return "Kombinace Quantum Dot a NanoCell s Mini LED podsvícením pro jasný a živý obraz s výborným kontrastem.";
    case "NanoCell":
      return "Technologie NanoCell zajišťuje čisté a přesné barvy díky filtraci nežádoucích odstínů.";
    case "LED":
      return "Klasická LED technologie nabízí spolehlivý obraz za příznivou cenu.";
    default:
      return "";
  }
};
