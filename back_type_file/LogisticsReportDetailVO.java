package com.glaf4.system.domain.cost;

import com.glaf4.dto.BaseDTO;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Data
public class LogisticsReportDetailVO extends BaseDTO implements Serializable{
    @ApiModelProperty("集计任务ID")
    private Long mainTaskId;

    @ApiModelProperty("1-设计室 2-组立原价")
    private String type;

    @ApiModelProperty("统计项")
    private String key;

    @ApiModelProperty("设计室 多选 接口返回下拉框 可以不传 不传就是查全部")
    List<String> rooms;

    @ApiModelProperty("组立部位 多选 接口返回下拉框 可以不传 不传就是查全部")
    List<String> groups;

    @ApiModelProperty("品番 多选 接口返回下拉框 可以不传 不传就是查全部")
    List<String> parts;




}
