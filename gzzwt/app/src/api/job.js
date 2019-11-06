//劳动就业专题
export default {
    // PREPATH: '/api/job', // 路径前缀
    /**
     * @description 17.劳动就业专题-个人就业失业登记信息查询
     * @interface POST /job/getUnemploymentRegisterInfo
     **/
    GetUnemploymentRegisterInfo: `/job/getUnemploymentRegisterInfo`,

    /**
     * @description 18.劳动就业专题-人才引进接收情况查询
     * @interface POST /job/getTalentIntroductionInfo
     **/
    GetTalentIntroductionInfo: `/job/getTalentIntroductionInfo`,

    /**
     * @description 19.劳动就业专题-高校毕业档案查询
     * @interface POST /job/getGraduationArchivesInfo
     **/
    GetGraduationArchivesInfo: `/job/getGraduationArchivesInfo`,

    /**
     * @description 20.劳动就业专题-专业技术资格查询
     * @interface POST /job/getPtCertRecordInfo
     **/
    GetPtCertRecordInfo: `/job/getPtCertRecordInfo`,
};
