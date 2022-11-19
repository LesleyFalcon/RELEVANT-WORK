using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Name.Models.Domain.Addresses
{
  public class BaseAddress
    {
        public int Id { get; set; }

        public string LineOne { get; set; }

        public int SuiteNumber { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string PostalCode { get; set; }
    }
}
