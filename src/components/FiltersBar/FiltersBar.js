import React from 'react';
import PropTypes from 'prop-types';
import { MONTHS, YEARS } from '../../constants/appConstants';
import {
  FiltersContainer,
  Select,
  Label,
  FiltersRow
} from './FiltersBar.styles';

const FiltersBar = ({ selectedMonth, selectedYear, onMonthChange, onYearChange }) => {
  return (
    <FiltersContainer>
      <FiltersRow>
        <Label htmlFor="year-select">Year:</Label>
        <Select
          id="year-select"
          value={selectedYear}
          onChange={(e) => onYearChange(Number(e.target.value))}
        >
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Select>

        <Label htmlFor="month-select">Month:</Label>
        <Select
          id="month-select"
          value={selectedMonth}
          onChange={(e) =>
            onMonthChange(
              e.target.value === 'LAST_3' ? 'LAST_3' : Number(e.target.value)
            )
          }
        >
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </Select>
      </FiltersRow>
    </FiltersContainer>
  );
};

FiltersBar.propTypes = {
  selectedMonth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  selectedYear: PropTypes.number.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired
};

export default FiltersBar;
