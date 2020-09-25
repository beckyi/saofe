import React from "react";
import styled from "styled-components";
import NAME from "../../utils/Enum";

interface IconProps {
  name: string;
  width?: string;
  height?: string;
  margin?: string;
}

interface optionsIFC {
  viewBox: string;
  width: number;
  height: number;
  fill: string;
  d_path: string[];
}

const IconArea = styled.div`
  display: inline-block;
  cursor: pointer;
  ${(props: IconProps) =>
    props.name === "setting" ? "float:right; margin: 10px; opacity: 0.7;" : ""}
  ${(props: IconProps) => (props.margin ? `margin:${props.margin}` : "")}
`;

const setOptions = (name: string): optionsIFC => {
  let viewBox = "",
    fill = "#fff",
    height = 0,
    width = 0,
    d_path = [];

  switch (name) {
    case NAME.INFORM:
      viewBox = "0 0 60 60";
      height = 22;
      width = 22;
      d_path.push(
        "M8 22c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zM52 22c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zM30 22c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8z"
      );
      break;
    case NAME.SETTING:
      viewBox = "0 0 340.274 340.274";
      width = 18;
      height = 18;
      d_path.push(
        "M293.629 127.806l-5.795-13.739c19.846-44.856 18.53-46.189 14.676-50.08l-25.353-24.77-2.516-2.12h-2.937c-1.549 0-6.173 0-44.712 17.48l-14.184-5.719c-18.332-45.444-20.212-45.444-25.58-45.444h-35.765c-5.362 0-7.446-.006-24.448 45.606l-14.123 5.734C86.848 43.757 71.574 38.19 67.452 38.19l-3.381.105-27.27 26.737c-4.138 3.891-5.582 5.263 15.402 49.425l-5.774 13.691C0 146.097 0 147.838 0 153.33v35.068c0 5.501 0 7.44 46.585 24.127l5.773 13.667c-19.843 44.832-18.51 46.178-14.655 50.032l25.353 24.8 2.522 2.168h2.951c1.525 0 6.092 0 44.685-17.516l14.159 5.758c18.335 45.438 20.218 45.427 25.598 45.427h35.771c5.47 0 7.41 0 24.463-45.589l14.195-5.74c26.014 11 41.253 16.585 45.349 16.585l3.404-.096 27.479-26.901c3.909-3.945 5.278-5.309-15.589-49.288l5.734-13.702c46.496-17.967 46.496-19.853 46.496-25.221V151.88c-.005-5.519-.005-7.446-46.644-24.074zM170.128 228.474c-32.798 0-59.504-26.187-59.504-58.364 0-32.153 26.707-58.315 59.504-58.315 32.78 0 59.43 26.168 59.43 58.315-.006 32.177-26.656 58.364-59.43 58.364z"
      );
      break;
    case NAME.CALENDAR:
      viewBox = "0 0 512 512";
      width = 30;
      height = 30;
      d_path.push(
        "m446 40h-46v-24c0-8.836-7.163-16-16-16s-16 7.164-16 16v24h-224v-24c0-8.836-7.163-16-16-16s-16 7.164-16 16v24h-46c-36.393 0-66 29.607-66 66v340c0 36.393 29.607 66 66 66h380c36.393 0 66-29.607 66-66v-340c0-36.393-29.607-66-66-66zm-380 32h46v16c0 8.836 7.163 16 16 16s16-7.164 16-16v-16h224v16c0 8.836 7.163 16 16 16s16-7.164 16-16v-16h46c18.748 0 34 15.252 34 34v38h-448v-38c0-18.748 15.252-34 34-34zm380 408h-380c-18.748 0-34-15.252-34-34v-270h448v270c0 18.748-15.252 34-34 34z"
      );
      break;
    case NAME.RICE:
      viewBox = "0 0 512 512";
      width = 30;
      height = 30;
      d_path.push(
        "M497,210h-16.53c-3.056-14.862-10.59-28.514-21.626-39.084c5.678-19.503,3.282-40.626-6.988-58.416c-10.272-17.79-27.368-30.426-47.096-35.26c-4.835-19.728-17.471-36.824-35.261-47.096c-17.788-10.27-38.912-12.666-58.415-6.988C297.035,8.488,277.543,0,257,0c-20.865,0-41.698,8.844-55.951,23.195c-19.539-5.727-40.721-3.344-58.549,6.949c-17.79,10.271-30.426,27.368-35.261,47.095c-19.728,4.834-36.824,17.47-47.095,35.26c-10.271,17.789-12.666,38.913-6.988,58.416C42.12,181.486,34.586,195.138,31.53,210H15c-8.284,0-15,6.716-15,15c0,88.059,45.651,169.721,120,216.259V467c0,24.813,20.187,45,45,45h182c24.813,0,45-20.187,45-45v-25.741c74.349-46.538,120-128.2,120-216.259C512,216.716,505.284,210,497,210z M79.496,188.019c6.034-4.177,8.159-12.107,5.023-18.743c-6.346-13.426-5.746-29.043,1.606-41.776c7.352-12.734,20.577-21.063,35.375-22.28c7.314-0.601,13.119-6.406,13.721-13.72c1.217-14.799,9.545-28.023,22.279-35.376c12.733-7.352,28.351-7.951,41.776-1.606c6.635,3.137,14.565,1.011,18.742-5.023C226.092,37.835,241.757,30,257,30c14.705,0,28.529,7.288,36.981,19.496c4.178,6.034,12.108,8.16,18.743,5.023c13.425-6.346,29.041-5.746,41.775,1.606s21.063,20.576,22.279,35.375c0.601,7.314,6.406,13.119,13.72,13.721c14.799,1.217,28.024,9.546,35.377,22.28c7.352,12.733,7.951,28.35,1.605,41.776c-3.136,6.635-1.011,14.566,5.023,18.743c7.91,5.476,13.737,13.215,16.871,21.981H62.624C65.759,201.234,71.585,193.495,79.496,188.019z M362,467c0,8.271-6.729,15-15,15H165c-8.271,0-15-6.729-15-15v-17h212V467z M369.098,420H142.902C77.53,382.275,35.497,314.374,30.502,239.8h450.996C476.503,314.374,434.47,382.275,369.098,420z"
      );
      break;
    case NAME.WRITE:
      viewBox = "0 0 512 512";
      width = 30;
      height = 30;
      d_path.push(
        "M352.459,220c0-11.046-8.954-20-20-20h-206c-11.046,0-20,8.954-20,20s8.954,20,20,20h206 C343.505,240,352.459,231.046,352.459,220z",
        "M126.459,280c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20H251.57c11.046,0,20-8.954,20-20c0-11.046-8.954-20-20-20 H126.459z",
        "M173.459,472H106.57c-22.056,0-40-17.944-40-40V80c0-22.056,17.944-40,40-40h245.889c22.056,0,40,17.944,40,40v123 c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20V80c0-44.112-35.888-80-80-80H106.57c-44.112,0-80,35.888-80,80v352 c0,44.112,35.888,80,80,80h66.889c11.046,0,20-8.954,20-20C193.459,480.954,184.505,472,173.459,472z",
        "M467.884,289.572c-23.394-23.394-61.458-23.395-84.837-0.016l-109.803,109.56c-2.332,2.327-4.052,5.193-5.01,8.345 l-23.913,78.725c-2.12,6.98-0.273,14.559,4.821,19.78c3.816,3.911,9,6.034,14.317,6.034c1.779,0,3.575-0.238,5.338-0.727 l80.725-22.361c3.322-0.92,6.35-2.683,8.79-5.119l109.573-109.367C491.279,351.032,491.279,312.968,467.884,289.572z M333.776,451.768l-40.612,11.25l11.885-39.129l74.089-73.925l28.29,28.29L333.776,451.768z M439.615,346.13l-3.875,3.867 l-28.285-28.285l3.862-3.854c7.798-7.798,20.486-7.798,28.284,0C447.399,325.656,447.399,338.344,439.615,346.13z",
        "M332.459,120h-206c-11.046,0-20,8.954-20,20s8.954,20,20,20h206c11.046,0,20-8.954,20-20S343.505,120,332.459,120z"
      );
      break;
    case NAME.COPY:
      viewBox = "0 0 512 512";
      width = 20;
      height = 25;
      fill = "#879eb3";
      d_path.push(
        "m399.800781 95.011719c-.089843-1.453125-.375-2.851563-.855469-4.226563-.175781-.511718-.308593-1.015625-.535156-1.503906-.773437-1.65625-1.746094-3.226562-3.082031-4.570312-.007813-.007813-.011719-.019532-.023437-.027344l-79.988282-79.992188c-.007812-.007812-.019531-.011718-.03125-.023437-1.347656-1.34375-2.925781-2.316407-4.585937-3.09375-.464844-.214844-.949219-.339844-1.4375-.511719-1.414063-.5-2.855469-.789062-4.351563-.878906-.316406-.019532-.585937-.183594-.910156-.183594h-224c-8.835938 0-16 7.164062-16 16v64h-48c-8.835938 0-16 7.164062-16 16v400c0 8.835938 7.164062 16 16 16h288c8.835938 0 16-7.164062 16-16s-7.164062-16-16-16h-272v-368h32v320c0 8.835938 7.164062 16 16 16h304c8.835938 0 16-7.164062 16-16v-336c0-.351562-.175781-.640625-.199219-.988281zm-79.800781-40.386719 25.375 25.375h-25.375zm-224 361.375v-384h192v64c0 8.835938 7.164062 16 16 16h64v304zm0 0",
        "m304 208h-144c-8.835938 0-16-7.164062-16-16s7.164062-16 16-16h144c8.835938 0 16 7.164062 16 16s-7.164062 16-16 16zm0 0",
        "m304 272h-144c-8.835938 0-16-7.164062-16-16s7.164062-16 16-16h144c8.835938 0 16 7.164062 16 16s-7.164062 16-16 16zm0 0",
        "m304 336h-144c-8.835938 0-16-7.164062-16-16s7.164062-16 16-16h144c8.835938 0 16 7.164062 16 16s-7.164062 16-16 16zm0 0"
      );
      break;
    case NAME.UPLOAD:
      viewBox = "0 0 449.306 449.306";
      width = 100;
      height = 100;
      fill = "#879eb3";
      d_path.push(
        "M160.914,98.834l53.29-53.812v193.306c0,5.771,4.678,10.449,10.449,10.449s10.449-4.678,10.449-10.449V45.021 l53.29,53.812c4.247,3.503,10.382,3.503,14.629,0c4.047-4.24,4.047-10.911,0-15.151l-71.053-71.576 c-4.165-3.725-10.464-3.725-14.629,0l-71.053,71.576c-4.047,4.24-4.047,10.911,0,15.151 C150.45,102.559,156.749,102.559,160.914,98.834z",
        "M447.739,255.568l-59.037-127.478c-1.584-3.872-5.231-6.506-9.404-6.792h-50.155c-5.771,0-10.449,4.678-10.449,10.449 s4.678,10.449,10.449,10.449h43.363l48.588,109.714h-59.559c-27.004-0.133-51.563,15.625-62.694,40.229 c-8.062,16.923-25.141,27.698-43.886,27.69h-60.604c-18.745,0.008-35.823-10.767-43.886-27.69 c-11.131-24.604-35.69-40.362-62.694-40.229H29.257l57.469-109.714h33.437c5.771,0,10.449-4.678,10.449-10.449 s-4.678-10.449-10.449-10.449H80.457c-4.017,0.298-7.584,2.676-9.404,6.269L2.09,254.523c-1.139,1.53-1.859,3.331-2.09,5.224 V390.36c0,28.735,25.078,49.633,53.812,49.633h341.682c28.735,0,53.812-20.898,53.812-49.633V259.748 C449.018,258.278,448.488,256.866,447.739,255.568z M428.408,390.36c0,17.241-15.673,28.735-32.914,28.735H53.812 c-17.241,0-32.914-11.494-32.914-28.735V272.809h66.873c18.745-0.008,35.823,10.767,43.886,27.69 c11.131,24.604,35.69,40.362,62.694,40.229h60.604c27.004,0.133,51.563-15.625,62.694-40.229 c8.062-16.923,25.141-27.698,43.886-27.69h66.873V390.36z"
      );
      break;
    default:
      break;
  }

  return { viewBox, fill, width, height, d_path };
};

//(event: React.MouseEvent) => void, ()=> void;
interface Props {
  id?: string;
  name: string;
  width?: string;
  height?: string;
  margin?: string;
  onClick?: (event: React.MouseEvent) => void;
  onMouseOver?: (event: React.MouseEvent) => void;
}

/** 
// const SVGIcon:React.FC<Props> ({name, onClick}) => {
// const SVGIcon = ({ name, onClick }: IconProps) => {
*/
const SVGIcon = ({ name, ...props }: Props) => {
  const option = setOptions(name);
  const { viewBox, width, height, fill, d_path } = option;
  // console.log(name, "na?");
  return (
    <IconArea name={name} {...props}>
      <svg
        id={name}
        x="0px"
        y="0px"
        fill={fill}
        enableBackground="new 0 0 512 512"
        viewBox={viewBox}
        width={width}
        height={height}
      >
        <g>
          {d_path.map((path, idx) => {
            return <path key={`PK${idx}`} d={path} />;
          })}
        </g>
        {name === NAME.RICE && (
          <g>
            <g>
              <circle cx="317" cy="135" r="15" />
            </g>
            <g>
              <circle cx="377" cy="165" r="15" />
            </g>
            <g>
              <circle cx="135" cy="135" r="15" />
            </g>
          </g>
        )}
      </svg>
    </IconArea>
  );
};

export default SVGIcon;
