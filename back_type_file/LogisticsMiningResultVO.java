package com.glaf4.system.domain.cost;

import com.glaf4.dto.BaseDTO;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class LogisticsMiningResultVO implements Serializable {
    @ApiModelProperty("集计任务ID")
    private Long mainTaskId;

    /**
     * 参考对比 0 = 差异 1=绝对值
     */
    @ApiModelProperty("参考对比")
    private String consultCompare;

    @ApiModelProperty("设计室 多选 接口返回下拉框 可以不传 不传就是查全部")
    List<String> rooms;

    @ApiModelProperty("组立部位 多选 接口返回下拉框 可以不传 不传就是查全部")
    List<String> groups;

    @ApiModelProperty("品番 多选 接口返回下拉框 可以不传 不传就是查全部")
    List<String> parts;

}
