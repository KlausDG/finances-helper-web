import { Circle, Icon } from "@/components";
import { Category } from "@/concepts/Categories/types";
import { JournalEntry } from "@/concepts/Journal";
import { Card, CardHeader, CardBody, Text } from "@chakra-ui/react";
import { ReportTable } from "../ReportTable";

type ReportCardProps = {
  report: {
    category: Category;
    entries: Array<JournalEntry>;
  };
};

export const ReportCard = ({ report }: ReportCardProps) => {
  return (
    <Card key={report.category.id}>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Circle size="sm" className={report.category.color}>
            {report.category.icon && (
              <Icon iconName={report.category.icon} size="18px" />
            )}
          </Circle>
          <Text>{report.category.name}</Text>
        </div>
      </CardHeader>
      <CardBody>
        <ReportTable reportEntries={report.entries} />
      </CardBody>
    </Card>
  );
};
