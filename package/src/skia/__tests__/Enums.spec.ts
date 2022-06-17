import type { EmbindEnum } from "canvaskit-wasm";

import {
  AlphaType,
  BlurStyle,
  ClipOp,
  ColorType,
  FillType,
  FilterMode,
  FontEdging,
  FontHinting,
  FontSlant,
  FontWeight,
  FontWidth,
  ImageFormat,
  MipmapMode,
  PaintStyle,
  PathOp,
  PathVerb,
  PointMode,
  SaveLayerFlag,
  StrokeCap,
  StrokeJoin,
  TileMode,
  VertexMode,
} from "../types";
import { Path1DEffectStyle } from "../types/PathEffect";
import { BlendMode } from "../types/Paint/BlendMode";

import { setupSkia } from "./setup";

const checkEnum = <T>(
  skiaEnum: T,
  canvasKitEnum: EmbindEnum,
  expectedToFail = false
) => {
  Object.keys(canvasKitEnum.values).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const namedKey = skiaEnum[key as keyof T] as keyof T;
    const expected = skiaEnum[namedKey];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const selectedEnum = canvasKitEnum[namedKey];
    if (selectedEnum === undefined && !expectedToFail) {
      console.log({ skiaEnum, canvasKitEnum });
      expect(selectedEnum).toBeDefined();
      return;
    } else if (selectedEnum === undefined && expectedToFail) {
      return;
    }
    const result = selectedEnum.value;
    if (expectedToFail) {
      expect(expected).not.toBe(result);
    } else {
      expect(expected).toBe(result);
    }
  });
};

describe("Enums", () => {
  it("Should match Paint enums values with CanvasKit", () => {
    const { CanvasKit } = setupSkia();
    checkEnum(PaintStyle, CanvasKit.PaintStyle);
    checkEnum(StrokeCap, CanvasKit.StrokeCap);
    checkEnum(StrokeJoin, CanvasKit.StrokeJoin, true);
    checkEnum(BlendMode, CanvasKit.BlendMode);
  });
  it("Should match TileMode enums values with CanvasKit", () => {
    const { CanvasKit } = setupSkia();
    checkEnum(TileMode, CanvasKit.TileMode);
  });
  it("Should match Font enums values with CanvasKit", () => {
    const { CanvasKit } = setupSkia();
    checkEnum(FontHinting, CanvasKit.FontHinting);
    checkEnum(FontEdging, CanvasKit.FontEdging);
    checkEnum(FontSlant, CanvasKit.FontSlant);
    checkEnum(FontWidth, CanvasKit.FontWidth);
    checkEnum(FontWeight, CanvasKit.FontWeight);
  });
  it("Should match PointMode enums values with CanvasKit", () => {
    const { CanvasKit } = setupSkia();
    checkEnum(PointMode, CanvasKit.PointMode);
  });
  it("Should match Image enums values with CanvasKit", () => {
    const { CanvasKit } = setupSkia();
    checkEnum(ColorType, CanvasKit.ColorType);
    checkEnum(AlphaType, CanvasKit.AlphaType);
    checkEnum(ImageFormat, CanvasKit.ImageFormat, true);
    checkEnum(MipmapMode, CanvasKit.MipmapMode);
    checkEnum(FilterMode, CanvasKit.FilterMode, true);
  });
  it("Should match Path enums values with CanvasKit", () => {
    const { CanvasKit } = setupSkia();
    checkEnum(PathOp, CanvasKit.PathOp);
    checkEnum(FillType, CanvasKit.FillType);
    checkEnum(Path1DEffectStyle, CanvasKit.Path1DEffect);
    expect(PathVerb.Close).toBe(CanvasKit.CLOSE_VERB);
    expect(PathVerb.Conic).toBe(CanvasKit.CONIC_VERB);
    expect(PathVerb.Cubic).toBe(CanvasKit.CUBIC_VERB);
    expect(PathVerb.Line).toBe(CanvasKit.LINE_VERB);
    expect(PathVerb.Move).toBe(CanvasKit.MOVE_VERB);
    expect(PathVerb.Quad).toBe(CanvasKit.QUAD_VERB);
  });
  it("Should match BlurStyle enums values with CanvasKit", () => {
    const { CanvasKit } = setupSkia();
    checkEnum(BlurStyle, CanvasKit.BlurStyle);
  });
  it("Should match VertexMode enums values with CanvasKit", () => {
    const { CanvasKit } = setupSkia();
    checkEnum(VertexMode, CanvasKit.VertexMode);
  });
  it("Should match Canvas enums values with CanvasKit", () => {
    const { CanvasKit } = setupSkia();
    expect(SaveLayerFlag.SaveLayerF16ColorType).toBe(
      CanvasKit.SaveLayerF16ColorType
    );
    expect(SaveLayerFlag.SaveLayerInitWithPrevious).toBe(
      CanvasKit.SaveLayerInitWithPrevious
    );
    checkEnum(ClipOp, CanvasKit.ClipOp);
  });
});
