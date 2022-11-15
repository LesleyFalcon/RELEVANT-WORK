using Name.Data;
using Name.Data.Providers;
using Name.Models;
using Name.Models.Domain;
using Name.Models.Requests.Attendance;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Name.Services
{
    public class AttendanceService : IAttendanceService
    {
        IDataProvider _data = null;
        public AttendanceService(IDataProvider data)
        {
            _data = data;
        }
        public int Add(AttendanceAddRequest model)
        {
            int id = 0;

            string procName = "[dbo].[Attendance_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                addCommonParams(model, col);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);


            },
                   returnParameters: delegate (SqlParameterCollection returnCollection)
                   {

                       object oId = returnCollection["@Id"].Value;

                       Int32.TryParse(oId.ToString(), out id);

                   });

            return id;
        }

        public Attendance GetById(int id)
        {
            string procName = "[dbo].[Attendance_Select_ById]";

            Attendance attendance = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {

                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {

                int startingIndex = 0;
                attendance = MapAttendance(reader, ref startingIndex);

            });


            return attendance;

        }

        public void Update(AttendanceUpdateRequest model)
        {
            string procName = "[dbo].[Attendance_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                addCommonParams(model, col);
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@UserId", model.UserId);



            },
            returnParameters: null);

        }

        public void Delete(int id)
        {
            string procName = "[dbo].[Attendance_Delete_ById]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);

            },
           returnParameters: null);

        }


        public Paged<Attendance> Pagination(int pageIndex, int pageSize, int sessionId)
        {
            Paged<Attendance> attendance = null;
            List<Attendance> list = null;
            int totalCount = 0;

            string procName = "[dbo].[Attendance_ByWorkShopId]";

            _data.ExecuteCmd(procName, (param) =>

            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
                param.AddWithValue("@SessionId", sessionId);
            },
                 (reader, recordSetIndex) =>


                 {
                     int startingIndex = 0;
                     Attendance aAttendance = MapAttendance(reader, ref startingIndex);

                     if (totalCount == 0)
                     {
                         totalCount = reader.GetSafeInt32(pageIndex++);
                     }

                     if (list == null)
                     {
                         list = new List<Attendance>();
                     }

                     list.Add(aAttendance);
                 }
                );
            if (list != null)
            {
                attendance = new Paged<Attendance>(list, pageIndex, pageSize, totalCount);
            }
            return attendance;

        }

        public Paged<Attendance> GetAll(int pageIndex, int pageSize)
        {
            Paged<Attendance> pagedList = null;
            List<Attendance> list = null;
            int totalCount = 0;

            string procName = "[dbo].[Attendance_SelectAll]";

            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@pageIndex", pageIndex);
                param.AddWithValue("@pageSize", pageSize);
            },
            (reader, recordSetIndex) =>
            {
                int startingIndex = 0;
                Attendance aAttendance = MapAttendance(reader, ref startingIndex);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (list == null)
                {
                    list = new List<Attendance>();
                }

                list.Add(aAttendance);
            });
            if (list != null)
            {
                pagedList = new Paged<Attendance>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Attendance> GetByUserId(int pageIndex, int pageSize, int currentUserId)
        {
            Paged<Attendance> pagedList = null;
            List<Attendance> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "dbo.Attendance_ByUserId",
                (param) =>

                {
                   
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@UserId", currentUserId);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Attendance aAttendance = MapAttendance(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex);


                    if (list == null)
                    {
                        list = new List<Attendance>();
                    }

                    list.Add(aAttendance);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Attendance>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        private static Attendance MapAttendance(IDataReader reader, ref int startingIndex)
        {
            Attendance attendance = new Attendance();

            attendance.Id = reader.GetSafeInt32(startingIndex++);
            attendance.SessionId = reader.GetSafeInt32(startingIndex++);
            attendance.WorkShopId = reader.GetSafeInt32(startingIndex++);
            attendance.Name = reader.GetSafeString(startingIndex++);
            attendance.UserId = reader.GetSafeInt32(startingIndex++);
            attendance.RoleId = reader.GetSafeInt32(startingIndex++);
            attendance.RoleName = reader.GetSafeString(startingIndex++);
            attendance.FirstName = reader.GetSafeString(startingIndex++);
            attendance.LastName = reader.GetSafeString(startingIndex++);
            attendance.IsPresent = reader.GetSafeBool(startingIndex++);
            attendance.AvatarUrl = reader.GetSafeString(startingIndex++);

            return attendance;
        }

        private static void addCommonParams(AttendanceAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@SessionId", model.SessionId);
            col.AddWithValue("@IsPresent", model.IsPresent);
        }

        


    }
}
