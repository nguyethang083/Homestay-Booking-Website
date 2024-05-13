import { Pagination } from "antd";

export type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const AntPagination = ({ page, pages, onPageChange }: Props) => {
  return (
    <div className="flex justify-center">
      <Pagination
        current={page}
        total={pages * 10}
        // Ant Design's Pagination component uses total number of data, not pages, so we multiply by 10 assuming each page contains 10 data
        onChange={onPageChange}
      />
    </div>
  );
};

export default AntPagination;
