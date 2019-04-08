export class ManagerConstant{

    static readonly questionType:any= 
    {
        REGULAR:'REG',
        CONTINGENCY:'CNTNGNCY',
        CONTINGENCYFILE:'CNTNGNCYF'
    }

    static readonly templateStatusDESC:any= {
        DRFT: 'DRAFT',
        INRVW:'IN-REVIEW',
        APRVD:'APPROVED'
    }

    static readonly templateStatusCode:any= {
        DRAFT: 'DRFT',
        IN_REVIEW:'INRVW',
        APPROVED:'APRVD'
    }

    static readonly complianceStatus:any={
        C:`Continuous`,
        I:`Intermittent`,
    }
}