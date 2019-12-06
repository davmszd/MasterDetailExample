using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MasterDetail.Web.Model
{
  public static class PagingExtention
  {
    public static PagedResult<T> GetPaged<T>(this IQueryable<T> query, int page, int pageSize) where T : class
    {
      var result = new PagedResult<T>();
      result.Page = page;
      result.PageSize = pageSize;
      result.TotalCount = query.Count();


      var pageCount = (double)result.TotalCount / pageSize;
      result.PageCount = (int)Math.Ceiling(pageCount);

      var skip = (page - 1) * pageSize;
      result.Results = query.Skip(skip).Take(pageSize).ToList();

      return result;
    }
  }

  public class PagingParameter
  {
    const int maxPageSize = 20;
    public string Filter { get; set; }
    public string SortOrder { get; set; }

    public int Page { get; set; }

    private int _pageSize { get; set; }

    public int PageSize
    {

      get { return _pageSize; }
      set
      {
        _pageSize = (value > maxPageSize) ? maxPageSize : value;
      }
    }
  }

  public abstract class PagedResultBase
  {
    public int Page { get; set; }
    public int PageCount { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }

    public int FirstRowOnPage
    {

      get { return (Page - 1) * PageSize + 1; }
    }

    public int LastRowOnPage
    {
      get { return Math.Min(Page * PageSize, TotalCount); }
    }
  }

  public class PagedResult<T> : PagedResultBase where T : class
  {
    public IList<T> Results { get; set; }

    public PagedResult()
    {
      Results = new List<T>();
    }
  }

}
