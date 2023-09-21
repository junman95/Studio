import { basicColors } from "@/resources/colors/colors";
import { styled } from "styled-components";
import { UndoElement } from "./UnDoElement";
import { RedoElement } from "./RedoElement";
import {
  CanvasHistoryType,
  CanvasAttribute,
  CanvasInstance,
} from "@/store/canvasHistoryStore";
import { observer } from "mobx-react";

type Props = {
  undoList: CanvasHistoryType[];
  redoList: CanvasHistoryType[];
};

type InstanceTranslate = {
  [attr in CanvasInstance]: string;
};

type AttributeTranslate = {
  [attr in CanvasAttribute]: string;
};

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 11px;
  color: ${basicColors.white};
  padding: 10px 11px;
`;

export const HistoryPanel = observer(({ undoList, redoList }: Props) => {
  const instance_translate: InstanceTranslate = {
    CUBE: "정육면체",
    CAPSULE: "캡슐",
    CONE: "원뿔",
    CYLINDER: "원기둥",
    SPHERE: "구",
    TORUS: "도넛",
    material: "머터리얼",
    GROUP: "그룹",
    camera: "카메라",
    light: "빛",
    initial: "초기상태",
  };

  const attr_translate: AttributeTranslate = {
    add: "추가",
    position: "변형 (position)",
    rotation: "변형 (rotation)",
    scale: "변형 (scale)",
    none: "",
  };

  return (
    <HistoryList>
      {undoList.map((value, idx) => (
        <UndoElement
          label={
            (instance_translate[value.instance] ?? value.instance) +
            " " +
            (attr_translate[value.attribute] ?? value.attribute)
          }
          key={idx + value.id}
          index={idx}
        />
      ))}
      {redoList.map((value, idx) => (
        <RedoElement
          label={
            (instance_translate[value.instance] ?? value.instance) +
            " " +
            (attr_translate[value.attribute] ?? value.attribute)
          }
          key={idx + value.id}
          index={idx}
        />
      ))}
    </HistoryList>
  );
});
