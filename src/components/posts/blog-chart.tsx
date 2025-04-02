'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts';

export type ChartType = 'line' | 'bar' | 'area' | 'pie';

interface BlogChartProps {
  title: string;
  description?: string;
  data: Record<string, unknown>[];
  type?: ChartType;
  xAxisKey?: string;
  dataKeys: string[];
  colors?: string[];
  labels?: Record<string, string>;
  className?: string;
  height?: number | string;
}

export function BlogChart({
  title,
  description,
  data,
  type = 'line',
  xAxisKey = 'name',
  dataKeys,
  colors,
  labels,
  className,
  height = 300,
}: BlogChartProps) {
  // 创建图表配置
  const chartConfig: ChartConfig = {};

  // 如果有自定义标签，添加到配置中
  if (labels) {
    Object.entries(labels).forEach(([key, label]) => {
      chartConfig[key] = { label };
    });
  }

  // 如果没有自定义标签，使用dataKeys作为标签
  if (!labels) {
    dataKeys.forEach(key => {
      chartConfig[key] = { label: key };
    });
  }

  // 如果有自定义颜色，添加到配置中
  if (colors && colors.length > 0) {
    dataKeys.forEach((key, index) => {
      const colorIndex = index % colors.length;
      if (!chartConfig[key]) {
        chartConfig[key] = { label: key };
      }
      chartConfig[key].color = colors[colorIndex];
    });
  }

  // 根据图表类型渲染不同的图表组件
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={8}
              tickFormatter={value => (typeof value === 'string' ? value.slice(0, 10) : value)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => `${value}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            {dataKeys.map(key => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={`var(--color-${key})`}
                strokeWidth={2}
                activeDot={{ r: 4, strokeWidth: 0 }}
                dot={{ r: 1, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={8}
              tickFormatter={value => (typeof value === 'string' ? value.slice(0, 10) : value)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => `${value}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            {dataKeys.map(key => (
              <Bar
                key={key}
                dataKey={key}
                fill={`var(--color-${key})`}
                radius={[4, 4, 0, 0]}
                barSize={40}
              />
            ))}
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={8}
              tickFormatter={value => (typeof value === 'string' ? value.slice(0, 10) : value)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => `${value}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            {dataKeys.map(key => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={`var(--color-${key})`}
                fill={`var(--color-${key})`}
                fillOpacity={0.2}
                strokeWidth={2}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            ))}
          </AreaChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKeys[0]}
              nameKey={xAxisKey}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors ? colors[index % colors.length] : `var(--chart-${(index % 5) + 1})`}
                />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        );

      default:
        return (
          <LineChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={8}
              tickFormatter={value => (typeof value === 'string' ? value.slice(0, 10) : value)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => `${value}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            {dataKeys.map(key => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={`var(--color-${key})`}
                strokeWidth={2}
                activeDot={{ r: 4, strokeWidth: 0 }}
                dot={{ r: 1, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full" style={{ height }}>
          {renderChart()}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
