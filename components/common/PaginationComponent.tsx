import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
    PaginationLink,
  } from "@/components/ui/pagination";
  
  interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  export default function PaginationComponent({
    currentPage,
    totalPages,
    onPageChange,
  }: PaginationProps) {
    const handleClick = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    };
  
    return (
      <div className="flex justify-center items-center mt-6">
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                onClick={() => handleClick(currentPage - 1)}
              />
            </PaginationItem>
  
            {/* First Page */}
            {currentPage > 2 && (
              <PaginationItem>
                <PaginationLink onClick={() => handleClick(1)}>1</PaginationLink>
              </PaginationItem>
            )}
  
            {currentPage > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
  
            {/* Previous Page */}
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => handleClick(currentPage - 1)}>
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}
  
            {/* Current Page */}
            <PaginationItem>
              <PaginationLink isActive>{currentPage}</PaginationLink>
            </PaginationItem>
  
            {/* Next Page */}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationLink onClick={() => handleClick(currentPage + 1)}>
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}
  
            {currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
  
            {/* Last Page */}
            {currentPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => handleClick(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
  
            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                className={
                  currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                }
                onClick={() => handleClick(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  }
  