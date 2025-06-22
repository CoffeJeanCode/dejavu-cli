import chalk from "chalk";

export const createGradient = (
  title: string,
  startColor: string,
  endColor: string
) => {
  const gradientSteps = title.length - 1;
  const gradientTitle = [];

  for (let i = 0; i < title.length; i++) {
    const ratio = i / gradientSteps;
    const r = Math.floor(
      (1 - ratio) * parseInt(startColor.slice(1, 3), 16) +
      ratio * parseInt(endColor.slice(1, 3), 16)
    );
    const g = Math.floor(
      (1 - ratio) * parseInt(startColor.slice(3, 5), 16) +
      ratio * parseInt(endColor.slice(3, 5), 16)
    );
    const b = Math.floor(
      (1 - ratio) * parseInt(startColor.slice(5, 7), 16) +
      ratio * parseInt(endColor.slice(5, 7), 16)
    );

    const color = `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

    gradientTitle.push(chalk.bgHex(color)(title[i]));
  }

  return gradientTitle.join("");
};
