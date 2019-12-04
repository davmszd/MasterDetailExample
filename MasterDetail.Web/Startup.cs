using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace MasterDetail.Web
{
    public class Startup1
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
        }
    }

    public class Startup
        {
            public void ConfigureServices(IServiceCollection services)
            {
                services.AddMvc();
              services.AddDbContext<DbContext>(options =>
              {
                options
                    .UseSqlServer(@"Server=.;initial catalog=MasterDetail;persist security info=True;user id=sanew;password=ali;MultipleActiveResultSets=True;");
                    //Disbale ClientEvaluation (throw exception when use this)
                    //.ConfigureWarnings(warning => warning.Throw(RelationalEventId.QueryClientEvaluationWarning));
              });

            }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
            {
                loggerFactory.AddConsole();

                if (env.IsDevelopment())
                {
                    app.UseDeveloperExceptionPage();
                }

                app.Use(async (context, next) => {
                    await next();
                    if (context.Response.StatusCode == 404 &&
                        !System.IO.Path.HasExtension(context.Request.Path.Value) &&
                        !context.Request.Path.Value.StartsWith("/api/", StringComparison.OrdinalIgnoreCase))
                    {
                        context.Request.Path = "/index.html";
                        await next();
                    }
                });

                app.UseMvcWithDefaultRoute();
                app.UseDefaultFiles();
                app.UseStaticFiles();
            }
        }
}
