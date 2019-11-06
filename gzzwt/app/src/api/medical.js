//医疗专题
export default {
    PREPATH: '/medical', // 路径前缀
    /**
     * @description 21．医疗专题-定点医院查询-级别下拉框
     * @interface POST /hospital/getHospitalGrades
     **/
    GetHospitalGrades: `/hospital/getHospitalGrades`,
    /**
     * @description     22．医疗专题-定点医院查询-列表
     * @interface POST /hospital/getHospitalList
     **/
    GetHospitalList: `/hospital/getHospitalList`,
    /**
     * @description     23．医疗专题-定点药店查询-列表
     * @interface POST /pharmacy/pharmacylist
     **/
    Pharmacylist: `/pharmacy/pharmacylist`,
    /**
     * @description    34．医疗专题-社保经办机构查询-全市下拉框：
     * @interface POST /hospital/getProvinceList
     **/
    GetProvinceList: `/hospital/getProvinceList`,
    /**
     * @description 36．医疗专题-执业护士查询：
     * @interface POST /comprehensive/getNurseCertificates
     **/
    GetNurseCertificates: `/comprehensive/getNurseCertificates`,
    /**
     * @description  37．医疗专题-执业医师查询：
     * @interface POST /comprehensive/getDoctorCertificates
     **/
    GetDoctorCertificates: `/comprehensive/getDoctorCertificates`,
    /**
     * @description  38．医疗专题-卫生许可证查询：
     * @interface POST /comprehensive/getSanitaryCertificate
     **/
    GetSanitaryCertificate: `/comprehensive/getSanitaryCertificate`,
    /**
     * @description ．医疗专题-健康证查询:
     * @interface POST /comprehensive/getHealthCertificate
     **/
    GetHealthCertificate: `/comprehensive/getHealthCertificate`,
    /**
    * @description  医疗专题-预约挂号列表:
    * @interface GET 
    **/
    HospitalList: `/hospital/list`,
    /**
     * @description  医疗专题-预约挂号-科室Tab栏:
     * @interface GET 
     **/
    HospitalDepartmentList: `/hospitalDepartment/list`,
    /**
     * @description ．预约挂号-医生列表:
     * @interface GET 
     **/
    DoctorList: `/doctor/list`,
    /**
     * @description ．预约挂号-获取可预约列表详细数据:
     * @interface GET 
     **/
    DoctorGetValidApplyList: `/doctor/getValidApplyList`,
    /**
     * @description ．预约挂号-获取可预约列表详细数据:
     * @interface GET 
     **/
    DoctorGetOne: `/doctor/getOne`,
    /**
     * @description ．新生儿接种-获取可预约列表详细数据:
     * @interface GET 
     **/
    VaccineList: `/vaccine/list`,
};
