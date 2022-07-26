/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-const */
import React, { CSSProperties } from "react";

interface BookProps {
  color?: string;
  name: string;
  style?: CSSProperties
}

function Book(props: BookProps) {
  const { color = "red", name, style } = props;

  // const linearColor = `linear-gradient(140deg, ${color} , #36BFEF)`
  const linearColor = `linear-gradient(100deg, ${color} , #f9f9f9)`;
  // color = `linear-gradient(140deg, #EADEDB 0%, #BC70A4 50%, #BFD641 75%)`

  // console.log({ color });

  const bookContainer: CSSProperties = {
    width: 130,
    height: 180,
    borderRadius: 3,
    background: linearColor,
    position: "relative",
    boxShadow: "4px 4px 4px #eee",
    fontFamily: "宋体-简, 新宋体",
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'inline-block',

    ...style
  };

  const bookNameContainer: CSSProperties = {
    width: 40,
    minHeight: 110,
    borderRadius: 2,
    backgroundColor: "white",
    position: "absolute",
    border: "8px solid transparent",
    top: 11,
    left: 13,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    // alignItems: 'flex-start',
    flexDirection: "column"
  };
  const bookNameBorder: CSSProperties = {
    width: 40,
    minHeight: 110,
    borderRadius: 2,
    backgroundColor: "white",
    position: "absolute",
    border: `8px solid ${color}`,
    top: 11,
    left: 13,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    // alignItems: 'flex-start',
    flexDirection: "column",
    opacity: "0.5"
  };

  const bookName: CSSProperties = {
    height: "inherit",
    userSelect: "none",
    color: "black",
    display: "flex",
    padding: "4px 0px",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "space-around",
    // border: '1px solid black',
    writingMode: "vertical-lr",
    textAlign: "center"
  };

  const bookNameNoUse: CSSProperties = {
    height: "inherit",
    userSelect: "none",
    color: "transparent",
    display: "flex",
    padding: "4px 0px",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "space-around",
    // border: '1px solid black',
    writingMode: "vertical-lr",
    textAlign: "center",
    opacity: 0.5
  };

  const bookVerLine: CSSProperties = {
    width: 4,
    height: 180,
    background: "white",
    position: "absolute",
    right: 25,
    top: 0
  };

  const bookHorLine1: CSSProperties = {
    width: 25,
    height: 4,
    background: "white",
    position: "absolute",
    right: 0,
    top: 25
  };
  const bookHorLine2: CSSProperties = {
    width: 25,
    height: 4,
    background: "white",
    position: "absolute",
    right: 0,
    top: 65
  };
  const bookHorLine3: CSSProperties = {
    width: 25,
    height: 4,
    background: "white",
    position: "absolute",
    right: 0,
    top: 105
  };
  const bookHorLine4: CSSProperties = {
    width: 25,
    height: 4,
    background: "white",
    position: "absolute",
    right: 0,
    top: 145
  };

  const textSpan: CSSProperties = {
    width: "100%",
    height: 18,
    position: 'relative',
    left: -1,
    top: -1
  };

  return (
    <div style={bookContainer}>
      <div style={bookNameContainer}>
        <div style={bookName}>
          {name.split("").map((ele) => (
            <span key={`real${ele}`} style={textSpan}>
              {ele}
            </span>
          ))}
        </div>
      </div>
      <div style={bookNameBorder}>
        {/* <div style={bookNameNoUse}>{name}</div> */}
        <div style={bookNameNoUse}>
          {name.split("").map((ele) => (
            <span key={`fake${ele}`} style={textSpan}>
              {ele}
            </span>
          ))}
        </div>
      </div>
      <div style={bookVerLine} />
      <div style={bookHorLine1} />
      <div style={bookHorLine2} />
      <div style={bookHorLine3} />
      <div style={bookHorLine4} />
    </div>
  );
}

export default Book;
