package com.glaf4.vo.cost.total.report;

import com.alibaba.fastjson.annotation.JSONField;
import com.glaf4.BigDecimalSerializer;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "跨集计报表-不含膜部品费-费用统计明细 前端使用 VO")
public class MultiTaskReportBpfDetailVueVO implements Serializable {

    @ApiModelProperty("新侧设计室")
    private String designerRoomName;

    @ApiModelProperty("新侧设计室id")
    private Long designerRoom;

    @ApiModelProperty(value = "组立")
    private String groupCode;

    @ApiModelProperty(value = "部位")
    private String componentCode;

    @ApiModelProperty(value = "Variation")
    private String variationCode;

    @ApiModelProperty(value = "品番")
    private String newPartCode;


    @ApiModelProperty(value = "品名")
    private String newPartName;

    @ApiModelProperty(value = "任务ID 前端忽略")
    private Long mainId;

    @ApiModelProperty(value = "任务名称 前端忽略")
    private String name;

    @ApiModelProperty(value = "金额 元每个 前端忽略")
    @JSONField(serializeUsing = BigDecimalSerializer.class)
    private BigDecimal amount1;

    @ApiModelProperty(value = "金额 元每台 前端忽略")
    @JSONField(serializeUsing = BigDecimalSerializer.class)
    private BigDecimal amount2;

    @ApiModelProperty(value = "明细")
    private List<MultiTaskReportBpfDetailDetailVueVO> items;
}
