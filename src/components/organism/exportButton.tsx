import { ExportIcon } from "@/components/icons/export";
import { Text } from "@/components/atoms/text";

interface ExportButtonProps {
  isExporting: boolean;
  onExport: () => void;
}

export default function ExportButton({
  isExporting,
  onExport,
}: ExportButtonProps) {
  return (
    <div 
      onClick={isExporting ? undefined : onExport}
      className={`flex items-center p-2 rounded-md transition-colors ${
        isExporting 
          ? "bg-gray-300 cursor-not-allowed" 
          : "bg-white hover:bg-gray-50 cursor-pointer shadow-md"
      }`}
    >
      <ExportIcon className={`size-5 mr-2 ${
        isExporting ? "text-gray-500" : "text-primary"
      }`} />
      <Text 
        size="body" 
        weight="medium" 
        className={isExporting ? "text-gray-500" : "text-primary"}
      >
        {isExporting ? "Mengexport..." : "Export PDF"}
      </Text>
    </div>
  );
}