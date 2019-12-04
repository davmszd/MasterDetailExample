using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MasterDetail.Web.Controllers
{

  [Route("api/[controller]")]
  public class ValuesController : ControllerBase
  {
    // GET: api/values
    [HttpGet]
    [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
    //public Task<IActionResult> Get()
    //{
    //  //return new string[] { "Hello", "dav" };
    //  return OkResult;
    //}

    public IActionResult Get()
    {
      return new JsonResult(new string[] { "Hello", "dav" });
    }
  }

}
