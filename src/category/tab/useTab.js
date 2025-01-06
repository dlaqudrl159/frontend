import { useState, useMemo } from "react";

export const useTab = (searchType) => {

  const [activeTab, setActiveTab] = useState(null);

  const tabs = useMemo(() => {
    if (searchType === 'jibun') {
      return [
        { id: "choice", label: "주소 선택" },
        { id: "region", label: "지번 주소" },
        { id: "apartmentname", label: "단지명" },
      ];
    } else {
      return [
        { id: "choice", label: "주소 선택" },
        { id: "region", label: "도로명" },
        { id: "apartmentname", label: "단지명" },
      ];
    }
  }, [searchType]);

  return { activeTab, setActiveTab, tabs };
}