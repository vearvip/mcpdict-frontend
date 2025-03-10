import PageContainer from "./components/PageContainer";
import { string1 } from "./str";

export default () => {
  function parseRimeString(input) {
    const lines = input.split("\n").filter((line) => line.trim());

    return lines.map((line) => {
      const parts = line.split("\t");

      // 处理首段，提取IPA和初始chars
      const [initialMatch, ipa, initialKey, firstChars] =
        /^([^\]]+)\[(\d+)\] ?(.+)/.exec(parts[0]);

      const chars = {
        [initialKey]: firstChars.trim(),
      };

      // 处理后续各分段
      for (let i = 1; i < parts.length; i++) {
        const match = parts[i].match(/^\[(\d+)\] ?(.+)/);
        if (!match) continue;

        const [_, key, val] = match;
        chars[key] = val.trim();
      }

      return { ipa, chars };
    });
  }

  return (
    <div
      style={{
        width: "fit-content",
        margin: "0 auto",
        fontFamily: "'FangSong', '仿宋', serif",
        fontSize: 18,
        paddingTop: 20,
      }}
    >
      <PageContainer title="XX同音字表">
        {parseRimeString(string1).map((item, itemIndex) => {
          const key = item.ipa + itemIndex;
          return (
            <div key={key}>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  padding: "20px 0 0 0",
                  // border: '1px solid red'
                }}
              >
                {item.ipa}
              </div>
              {Object.keys(item.chars).map((tone) => {
                const words = item.chars[tone];
                const subKey = itemIndex + tone + words;
                return (
                  <div key={subKey}>
                    [{tone}]<span style={{ marginLeft: 5 }}>{words}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </PageContainer>
    </div>
  );
};
