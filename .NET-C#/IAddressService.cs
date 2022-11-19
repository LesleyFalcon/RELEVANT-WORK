using Name.Models.Domain.Addresses;
using Name.Models.Requests.Addresses;
using System.Collections.Generic;

namespace Name.Services
{
    public interface IAddressService
    {
        int Add(AddressAddRequest model, int usrId);
        
        void Delete(int Id);
        
        Address Get(int Id);
       
       List<Address> GetRandomAddresses();
        
        void Update(AddressUpdateRequest model); 
    }
}  
