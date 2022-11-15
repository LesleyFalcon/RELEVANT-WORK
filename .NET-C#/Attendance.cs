using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Name.Models.Domain
{
    public class Attendance
    {
        public int Id { get; set; }
        
        public int SessionId { get; set; }

        public int WorkShopId { get; set; }

        public string Name { get; set; }
        
        public int UserId { get; set; }

        public int RoleId { get; set; }

        public string RoleName { get; set; }

        public string FirstName { get; set; }
       
        public string LastName { get; set; }
        
        public bool IsPresent { get; set; }

        public string AvatarUrl { get; set; }
        
    }
}

