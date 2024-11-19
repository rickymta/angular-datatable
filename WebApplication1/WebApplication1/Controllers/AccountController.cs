using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using WebApplication1.Models;

namespace WebApplication1.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Get(AccountFilter request)
    {
        var dataPath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "person.json");
        var json = System.IO.File.ReadAllText(dataPath);
        var accounts = JsonSerializer.Deserialize<List<Account>>(json) ?? [];

        // Lấy thông tin phân trang
        var page = request.Page ?? 1;
        var limit = request.Limit ?? 10;
        if (page < 0) page = 1;
        if (limit < 10) limit = 10;
        // Áp dụng các bộ lọc
        var filteredAccounts = accounts.AsQueryable();

        if (!string.IsNullOrEmpty(request.FullName))
            filteredAccounts = filteredAccounts.Where(x => x.FullName.Contains(request.FullName, StringComparison.OrdinalIgnoreCase));

        if (!string.IsNullOrEmpty(request.Email))
            filteredAccounts = filteredAccounts.Where(x => x.Email.Contains(request.Email, StringComparison.OrdinalIgnoreCase));

        if (!string.IsNullOrEmpty(request.Avatar))
            filteredAccounts = filteredAccounts.Where(x => x.Avatar.Contains(request.Avatar, StringComparison.OrdinalIgnoreCase));

        if (!string.IsNullOrEmpty(request.PhoneNumber))
            filteredAccounts = filteredAccounts.Where(x => x.PhoneNumber.Contains(request.PhoneNumber, StringComparison.OrdinalIgnoreCase));

        if (!string.IsNullOrEmpty(request.Gender))
            filteredAccounts = filteredAccounts.Where(x => x.Gender.Contains(request.Gender, StringComparison.OrdinalIgnoreCase));

        // Tổng số kết quả
        var total = filteredAccounts.Count();

        // Áp dụng phân trang
        var pagedAccounts = filteredAccounts
            .Skip((page - 1) * limit)
            .Take(limit)
            .ToList();

        var dataPaging = new DataPaging<List<Account>>
        {
            PaginationCount = total,
            Data = pagedAccounts
        };

        return Ok(dataPaging);
    }
}
