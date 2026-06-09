using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASP_NET_Core.Models;

public class SampleEmployee {
    public int ID { get; set; }
    public int Head_ID { get; set; }
    public string Full_Name { get; set; }
    public string Prefix { get; set; }
    public string Title { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string Mobile_Phone { get; set; }
    public string Email { get; set; }
    public string Skype { get; set; }
    public DateTime Hire_Date { get; set; }
    public DateTime Birth_Date { get; set; }
}
