using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MasterDetail.Web.Model
{
  public class DBContext : DbContext
  {
    public DbSet<Person> Person { get; set; }
    public DbSet<PersonPost> PersonPost { get; set; }
    public DbSet<PersonPostDetail> PersonPostDetail { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlServer(@"Server=.;initial catalog=MasterDetail;persist security info=True;user id=sanew;password=ali;MultipleActiveResultSets=True;");

    }
  }


  public class Person
  {
    public string Id { get; set; }

    public string Name { get; set; }
    public string Family { get; set; }
    public string NationalCode { get; set; }
    public bool Subscribed { get; set; }
    public List<PersonPost> ThePersonPostList { get; set; }

  }

  public class PersonPost
  {
    public string Id { get; set; }

    public string Name { get; set; }
    public string Description { get; set; }

    public List<PersonPostDetail> ThePersonPostDetailList { get; set; }
  }

  public class PersonPostDetail
  {
    public string Id { get; set; }
    public string FromDate { get; set; }
    public string ToDate { get; set; }
  }
}
