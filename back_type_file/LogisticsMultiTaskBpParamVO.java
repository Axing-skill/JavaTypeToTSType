package com.glaf4.system.domain.cost;

import com.glaf4.dto.BaseDTO;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
public class LogisticsMultiTaskBpParamVO extends BaseDTO {

    @ApiModelProperty("集计任务ID")
    private List<Long> mainTaskIds;

    @ApiModelProperty("车型编码")
    private String modelCode;


    @ApiModelProperty("费用维度 all(总览) room(设计室)")
    private String costDimension;


    @ApiModelProperty("分组类型 part(品番) group(组立) room(设计室)")
    private String groupType;


    /**
     * 参考对比 0 = 差异 1=绝对值
     */
    @ApiModelProperty("参考对比")
    private String consultCompare;


    @ApiModelProperty("设计室 多选 接口返回下拉框 可以不传 不传就是查全部")
    private List<String> rooms;

    @ApiModelProperty("组立部位 多选 接口返回下拉框 可以不传 不传就是查全部")
    private List<String> groups;

    @ApiModelProperty("品番 多选 接口返回下拉框 可以不传 不传就是查全部")
    private List<String> parts;

    @ApiModelProperty("是否查询总额标记")
    private Boolean queryTotalAmtFlag;

    @ApiModelProperty("是否跨车型标记")
    private Boolean isCrossCarModel;
}
