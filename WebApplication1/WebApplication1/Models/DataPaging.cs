namespace WebApplication1.Models;

public class DataPaging<T>
{
    public int PaginationCount { get; set; }

    public T? Data { get; set; }
}
