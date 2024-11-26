package com.glaf4.system.domain.cost;

import com.alibaba.fastjson.annotation.JSONField;
import com.glaf4.BigDecimalSerializer;
import com.glaf4.vo.cost.total.CostTotalLogisticsVO;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class LogisticsReportDetailResultVO {
    @ApiModelProperty(value = "总记录数")
    private long total;

    @ApiModelProperty(value = "列表数据")
    private List<CostTotalLogisticsVO> rows;


    private LogisticsTotalAmtInfo totalRow;

}
