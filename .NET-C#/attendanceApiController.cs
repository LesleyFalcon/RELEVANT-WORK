using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Attendance;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/attendances")]
    [ApiController]
    public class AttendanceApiController : BaseApiController
    {

        private IAttendanceService _service = null;
        private IAuthenticationService<int> _authService = null;
        public AttendanceApiController(IAttendanceService service, ILogger<AttendanceApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(AttendanceAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.Add(model);

                ItemResponse<int> response = new ItemResponse<int>() { Item = id };
                result = Created201(response);
            }

            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Attendance>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {

                Attendance attendance = _service.GetById(id);
                if (attendance == null)

                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Attendance> { Item = attendance };
                }
            }

            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: ${ex.Message}");

            }

            return StatusCode(iCode, response);


        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(AttendanceUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Update(model);
                response = new SuccessResponse();

            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }


        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(id);
                response = new SuccessResponse();

            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("session/{id:int}")]
        public ActionResult<ItemResponse<Paged<Attendance>>> Pagination(int Id,int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Attendance> paged = _service.Pagination(pageIndex, pageSize, Id);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Attendance>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);

        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Attendance>>> GetAll(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Attendance> paged = _service.GetAll(pageIndex, pageSize);

                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Record not found.");
                }
                else
                {
                    ItemResponse<Paged<Attendance>> itemResponse = new ItemResponse<Paged<Attendance>>();
                    itemResponse.Item = paged;
                    response = new ItemResponse<Paged<Attendance>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("current")]
        public ActionResult<ItemResponse<Paged<Attendance>>> GetByUserId(int pageIndex, int pageSize)
        {

            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int currentUserId = _authService.GetCurrentUserId();
                Paged<Attendance> paged = _service.GetByUserId(pageIndex, pageSize, currentUserId);

                if (paged == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Record not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Attendance>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }



    }
}
