import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import React from 'react';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';

export const PeopleTable = ({ peoples, sort }: { peoples: Person[], sort: string }) => {
  const [searchParams] = useSearchParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(key => {
            const keyToParam = key.toLocaleLowerCase();
            const isDesc = searchParams.has('order');

            return (
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {key}
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        sort: isDesc && sort === keyToParam ? null : keyToParam,
                        order:
                          (isDesc && sort === keyToParam) ||
                          !sort ||
                          sort !== keyToParam
                            ? null
                            : 'desc',
                      }),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas',
                          {
                            'fa-sort':
                              (!isDesc && !sort) || sort !== keyToParam,
                          },
                          {
                            'fa-sort-up': !isDesc && sort === keyToParam,
                          },
                          {
                            'fa-sort-down': isDesc && sort === keyToParam,
                          },
                        )}
                      />
                    </span>
                  </Link>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peoples.map(person => {
          const personWithParent = {
            ...person,
            mother: peoples.find(a => a.name === person.motherName),
            father: peoples.find(a => a.name === person.fatherName),
          };

          return <PersonLink key={person.slug} person={personWithParent} />;
        })}
      </tbody>
    </table>
  );
};
