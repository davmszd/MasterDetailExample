using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MasterDetail.Web.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MasterDetail.Web.Controllers
{
  [Route("api/[controller]")]
  public class PersonController : ControllerBase
  {
    [HttpGet]
    [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
    public IActionResult Get()
    {
      List<MasterDetail.Web.Model.Person> persons = new List<Person>();
      using (var db = new DBContext())
      {
        persons = db.Person
                    .Include(x => x.ThePersonPostList)
                    //.Take(5)
                    .OrderBy(x => x.Name)
                    .ToList();
      }
      return new JsonResult(persons);
    }

    [HttpPost]
    public IActionResult Post([FromBody]PersonVM personvm)
    {
      using (var db = new DBContext())
      {
        if (personvm.IsNew)
        {
          var personNew = new Person()
          {
            Name = personvm.Name,
            Family = personvm.Family,
            Subscribed = personvm.Subscribed,
            NationalCode = personvm.NationalCode,
          };
          db.Attach(personNew);
          db.SaveChanges();
          return Ok(personvm);

        }
        var person = db.Person.Find(personvm.Id);
        if (person != null)
        {
          person.Name = personvm.Name;
          person.Family = personvm.Family;
          person.Subscribed = personvm.Subscribed;
          person.NationalCode = personvm.NationalCode;
          foreach (var item in personvm.ThePersonPostList)
          {
            if (item.IsNew)
            {
              person.ThePersonPostList = new List<PersonPost>() {
                new MasterDetail.Web.Model.PersonPost()
                 {
                   Name = item.Name,
                   Description = item.Description,
                 }
              };
            }
            else if (item.IsEdited)
            {
              var editedPersonPost = db.PersonPost.Find(item.Id);
              editedPersonPost.Name = item.Name;
              editedPersonPost.Description = item.Description;
              db.Attach(editedPersonPost);
            }
            else if (item.IsDeleted)
            {
              var deletedPersonPost = db.PersonPost.Find(item.Id);
              db.PersonPost.Remove(deletedPersonPost);
            }
          }
        }
        db.Attach(person);
        db.SaveChanges();
      }
      return Ok(personvm);
    }

    [HttpPost]
    [Route("[action]")]
    public IActionResult Delete([FromBody]PersonVM personvm)
    {
      using (var db = new DBContext())
      {
        var person  = db.Person.Include(i => i.ThePersonPostList)
                               .SingleOrDefault(x => x.Id == personvm.Id);
        if (person != null)
        {
          db.Person.Remove(person);
        }
        db.SaveChanges();
      }
      return Ok();
    }
  }

  public class BaseVM
  {
    public bool IsNew { get; set; }
    public bool IsEdited{ get; set; }
    public bool IsDeleted { get; set; }
  }

  public class PersonVM : BaseVM
  {
    public string Id { get; set; }

    public string Name { get; set; }
    public string Family { get; set; }
    public string NationalCode { get; set; }
    public bool Subscribed { get; set; }
    public List<PersonPostVM> ThePersonPostList { get; set; }

  }

  public class PersonPostVM : BaseVM
  {
    public string Id { get; set; }

    public string Name { get; set; }
    public string Description { get; set; }

    public List<PersonPostDetailVM> ThePersonPostDetailList { get; set; }
  }

  public class PersonPostDetailVM : BaseVM
  {
    public string Id { get; set; }
    public string FromDate { get; set; }
    public string ToDate { get; set; }
  }
}
