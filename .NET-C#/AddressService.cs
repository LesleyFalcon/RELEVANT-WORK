using Name.Data.Providers;
using Name.Models.Domain.Addresses;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Name.Data;
using Name.Models.Requests.Addresses;

namespace Name.Services
{
    public class AddressService : IAddressService 
    {
        IDataProvider _data = null; 

        public AddressService(IDataProvider data) 
        {

            _data = data;
        }



        public void Update(AddressUpdateRequest model)
        {
            string procName = "[dbo].[Name_Addresses_Update]";
            
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                
            {
                AddCommonParams(model, col);
                col.AddWithValue("@Id", model.Id);

            },
            returnParameters: null);

        }


        public void Delete(int Id)
        {
            string procName = "[dbo].[Name_Addresses_DeleteById]";
            _data.ExecuteNonQuery(procName,
            inputParamMapper: delegate (SqlParameterCollection collectionOfParams)
            {
                collectionOfParams.AddWithValue("@Id", Id);
            },
               returnParameters: null);

        }


        public int Add(AddressAddRequest model, int userId)
        {
            int Id = 0;

            string procName = "[dbo].[Name_Addresses_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@UserId", userId);

                    SqlParameter IdOut = new SqlParameter("@Id", SqlDbType.Int);
                    IdOut.Direction = ParameterDirection.Output;

                    col.Add(IdOut);
                },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                int.TryParse(oId.ToString(), out Id);
                Console.WriteLine("");
            });

            return Id;
        }




        private static void AddCommonParams(AddressAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@LineOne", model.LineOne);
            col.AddWithValue("@SuiteNumber", model.SuiteNumber);
            col.AddWithValue("@City", model.City);
            col.AddWithValue("@State", model.State);
            col.AddWithValue("@PostalCode", model.PostalCode);
            col.AddWithValue("@IsActive", model.IsActive);
            col.AddWithValue("@Lat", model.Lat);
            col.AddWithValue("@Long", model.Long);
        }





        public Address Get(int Id)
        {

            string procName = "[dbo].[Name_Addresses_SelectById]";


            Address address = null; 

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection collectionOfParams)
            {
                
                collectionOfParams.AddWithValue("@Id", Id);

            }, delegate (IDataReader reader, short set)
            {
                address = MapSingleAddress(reader);

            }, delegate (SqlParameterCollection returnParams)
            {

            });



            return address;


        }


        public List<Address> GetRandomAddresses() 
        {
            List<Address> list = null;
            string procName = "[dbo].[Name_Addresses_SelectRandom50]";



            _data.ExecuteCmd(procName, inputParamMapper: null
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Address aAddress = MapSingleAddress(reader);

                    if (list == null)
                    {
                        list = new List<Address>();
                    }

                    list.Add(aAddress);

                });
            return list;
        }

        private static Address MapSingleAddress(IDataReader reader)
        {
            Address aAddress = new Address();
            int startingIdex = 0; 
            aAddress.Id = reader.GetSafeInt32(startingIdex++); 
            aAddress.LineOne = reader.GetSafeString(startingIdex++);
            aAddress.SuiteNumber = reader.GetSafeInt32(startingIdex++);
            aAddress.City = reader.GetSafeString(startingIdex++);
            aAddress.State = reader.GetSafeString(startingIdex++);
            aAddress.PostalCode = reader.GetSafeString(startingIdex++);
            aAddress.IsActive = reader.GetSafeBool(startingIdex++);
            aAddress.Lat = reader.GetSafeDouble(startingIdex++);
            aAddress.Long = reader.GetSafeDouble(startingIdex++);
            return aAddress;
        }
    }
}
